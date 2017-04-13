let CalculateMovementUtilClass = require ("../util/calculateMovementUtil.js");
let DeploymentCardsTypesUtilClass = require("../util/deploymentCardsTypesUtil.js");
let ActionContextMenuViewClass = require("../view/actionContextMenuView.js");

// transition
let PlayerActionToMovePlayerTransitionDataClass = require("../state/transitions/playerActionToMovePlayerTransitionData.js");
let PlayerActionToAttackRangeTransitionDataClass = require("../state/transitions/playerActionToAttackRangeTransitionData.js");

let _ = require('underscore');

function moveFigure()
{
    function filterFunction(cell)
    {
        return _.isEqual(cell.position, this.selectedPosition);
    }
    this.transition = "MOVE_MODEL";
    let selectedPosition = _.find(this.movementPositions, filterFunction, this);
    this.gameModel.transitionData = new PlayerActionToMovePlayerTransitionDataClass(this.selectedModel, this.selectedPosition, selectedPosition.moveCount);
}

function attackEnemyAtPosition()
{
    let enemy = this.levelModel.getGridContent(this.selectedPosition.x, this.selectedPosition.y);
    this.transition = "ATTACK_ENEMY_RANGED";
    this.gameModel.transitionData = new PlayerActionToAttackRangeTransitionDataClass(this.selectedModel, enemy);
}

function meleeEnemyAtPosition()
{
    console.log("PlayerActionsState.meleeEnemyAtPosition is not created");
}

function interactAtPosition()
{
    console.log("PlayerActionsState.interactAtPosition is not created");
}

function actionableCellSelected(x, y)
{
    function filterPredicate(element)
    {
        return (element.position.x === x && element.position.y === y);
    }

    // find actions withinCell
    let actions = _.filter(this.actionableCells, filterPredicate, this);
    if (actions !== undefined)
    {
        if (actions.length > 1) console.log("PlayerActionsState.actionableCellSelected: found more than one cell in actionable cell - only using first");
        
        this.selectedPosition = actions[0].position;
        this.actionContextMenuView.displayMenu(actions[0], 
            this,
            moveFigure,
            attackEnemyAtPosition,
            meleeEnemyAtPosition,
            interactAtPosition
        );
    }
}


function GetAllEnemiesAttackableByMelee()
{
    let meleeEnemies = [];
    if (this.selectedModel.canMeleeAttack())
    {
        let surroundingArea = CalculateMovementUtilClass.getSurroundingArea(this.selectedModel.position, this.levelModel);
        for (let i = 0; i < surroundingArea.length; ++i)
        {
            let enemyArmy = this.selectedModel.deploymentCard.affiliation === DeploymentCardsTypesUtilClass.getAffiliations().REBEL ? DeploymentCardsTypesUtilClass.getAffiliations().EMPIRE : DeploymentCardsTypesUtilClass.getAffiliations().REBEL;
            meleeEnemies = this.levelModel.getArmyModelsInCell(this.selectedModel.position, enemyArmy);
        }
    }

    return meleeEnemies;
}

function GetAllEnemiesAttackableByRange()
{
    let rangeEnemies = [];
    let selectedModelPos = this.selectedModel.position;

    if (this.selectedModel.canRangeAttack())
    {
        let enemyArmy = this.gameModel.getEnemyArmy(this.selectedModel.deploymentCard.affiliation);
        for (let i = 0; i < enemyArmy.length; ++i)
        {
            let enemyPos = enemyArmy[i].position;
            if (this.levelModel.isVisibleToEachOther(selectedModelPos, enemyPos))
            {
                rangeEnemies.push(enemyPos);
            }
        }
    }

    return rangeEnemies;
}

function PlayerActionsState(stage, models, levelView)
{
    this.stage = stage;
    this.gameModel = models.GameModel;
    this.levelModel = models.LevelModel;
    this.levelView = levelView;
    this.selectedModel = null;

    this.actionableCells = [];
    this.selectedPosition = null;
    this.actionContextMenuView = new ActionContextMenuViewClass(this.stage, {x: 0, y:0});
    
    // movement variables
    this.movementPositions= null;

    // attacking variables
    this.attackableEnemies = [];

    this.transition = null;
    this.transitionData = null;
}

PlayerActionsState.prototype.start = function(transitionData)
{
    this.selectedModel = transitionData.selectedModel;
    this.findAllActionableCells();
};

PlayerActionsState.prototype.update = function()
{
    if (this.transition !== null)
    {
        return this.transition;
    }
    
    return null;
};

PlayerActionsState.prototype.end = function()
{
    this.levelView.clearSelectableTiles(actionableCellSelected);
    this.actionableCells = [];
    this.transition = null;
};

PlayerActionsState.prototype.findAllActionableCells = function()
{
    let cellPositions = this.calculateMovements();
    this.attackableEnemies = this.calculateAttackActions();
    for (let i = 0; i < cellPositions.length; ++i)
    {
        this.actionableCells.push({position: cellPositions[i], canMove:true, canMelee:false, canRange:false, canInteract:false});
    }

    for (let i = 0; i < this.attackableEnemies.length; ++i)
    {
        let cellAlready = _.findWhere(this.actionableCells, {position: this.attackableEnemies.enemy});
        if (cellAlready !== undefined)
        {
            cellAlready.canMelee = this.attackableEnemies[i].canMelee;
            cellAlready.canRange = this.attackableEnemies[i].canRange;
        }
        else
        {
            let melee = this.attackableEnemies[i].canMelee;
            let range = this.attackableEnemies[i].canRange;
            this.actionableCells.push({position: this.attackableEnemies[i].enemy, canMove:false, canRange:range, canMelee:melee, canInteract:false});
        }
    }
    let positions = _.pluck(this.actionableCells, 'position');
    this.levelView.setTilesToSelect(positions, actionableCellSelected, this);
};

PlayerActionsState.prototype.calculateMovements = function()
{
    this.movementPositions = CalculateMovementUtilClass.calculateMovementLength(this.levelModel, this.selectedModel);
    let movementCells = _.pluck(this.movementPositions, 'position'); 
    this.levelModel.showMovementHighlight(movementCells);
    return movementCells;
};

PlayerActionsState.prototype.calculateAttackActions = function()
{
    let meleeEnemies = GetAllEnemiesAttackableByMelee.call(this);
    let rangeEnemies = GetAllEnemiesAttackableByRange.call(this);
    let attackableEnemies = [];

    for (let i = 0; i < meleeEnemies.length; ++i)
    {
        attackableEnemies.push({enemy: meleeEnemies[i], canMelee: true});
    }

    for (let i = 0; i < rangeEnemies.length; ++i)
    {
        let alreadyExistingEnemy = _.findWhere(attackableEnemies, {enemy: rangeEnemies[i]});
        if (alreadyExistingEnemy !== undefined)
        {
            alreadyExistingEnemy.canRange = true;
        }
        else
        {
            attackableEnemies.push({enemy:rangeEnemies[i], canRange: true,});
        }
    }

    return attackableEnemies;
};


module.exports = PlayerActionsState;