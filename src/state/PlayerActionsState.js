let CalculateMovementUtilClass = require ("./../util/calculateMovementUtil.js");
let DeploymentCardsTypesUtilClass = require("./../util/deploymentCardsTypesUtil.js");

let _ = require('underscore');

function moveCharacter(x, y)
{
    this.movePositionSelected = {x: x, y: y};
    this.finishedMove = true;
}

function canRangeAttack()
{
    return this.selectedModel.deploymentCard.attackType === DeploymentCardsTypesUtilClass.getAttackTypes().RANGE;
}

function canMeleeAttack()
{
    return this.selectedModel.deploymentCard.attackType === DeploymentCardsTypesUtilClass.getAttackTypes().MELEE;
}

function attackEnemyAtPosition(x, y)
{
    this.attacking = true;
}

function GetAllEnemiesAttackableByMelee()
{
    let meleeEnemies = [];
    if (canMeleeAttack.call(this))
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

    if (canRangeAttack.call(this))
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

function PlayerActionsState(models, levelView)
{
    this.gameModel = models.GameModel;
    this.levelModel = models.LevelModel;
    this.levelView = levelView;
    this.selectedModel = null;
    
    // movement variables
    this.movementPositions= null;
    this.cellPositions= null;
    this.movePositionSelected = null;
    this.finishedMove = false;

    // attacking variables
    this.attackableEnemies = [];
    this.attacking = false;
}

PlayerActionsState.prototype.start = function()
{
    this.selectedModel = this.gameModel.selectedModel;
    this.calculateMovements();
    this.calculateAttackActions();
};

PlayerActionsState.prototype.update = function()
{
    function filterFunction(cell)
    {
        return _.isEqual(cell.position, this.movePositionSelected);
    }

    if (this.finishedMove)   
    {
        this.levelView.clearSelectableTiles(moveCharacter);
        this.levelModel.moveModel(this.selectedModel, this.movePositionSelected);
        let selectedPosition = _.find(this.movementPositions, filterFunction, this);
        this.selectedModel.deploymentCard.currentSpeed = this.selectedModel.deploymentCard.currentSpeed - selectedPosition.moveCount;
        this.movePositionSelected = null;
        this.finishedMove = false;
        
        this.calculateMovements();
    }

    return null;
};

PlayerActionsState.prototype.end = function()
{

};

PlayerActionsState.prototype.calculateMovements = function()
{
    this.movementPositions = CalculateMovementUtilClass.calculateMovementLength(this.levelModel, this.selectedModel);
    this.cellPositions = _.pluck(this.movementPositions, 'position');

    // lockie - not sure if one call should inform the other here
    this.levelModel.showMovementHighlight(this.cellPositions);
    this.levelView.setTilesToSelect(this.cellPositions, moveCharacter, this);
};

PlayerActionsState.prototype.calculateAttackActions = function()
{
    let meleeEnemies = GetAllEnemiesAttackableByMelee.call(this);
    let rangeEnemies = GetAllEnemiesAttackableByRange.call(this);

    for (let i = 0; i < meleeEnemies.length; ++i)
    {
        this.attackableEnemies.push({enemy: meleeEnemies[i], canMelee: true});
    }

    for (let i = 0; i < rangeEnemies.length; ++i)
    {
        let alreadyExistingEnemy = _.findWhere(this.attackableEnemies, {enemy: rangeEnemies[i]});
        if (alreadyExistingEnemy !== undefined)
        {
            alreadyExistingEnemy.canRange = true;
        }
        else
        {
            this.attackableEnemies.push({enemy:rangeEnemies[i], canRange: true});
        }
    }

    // This can be the same as 
    let cellPositions = _.pluck(this.attackableEnemies, 'enemy');
    this.levelView.setTilesToSelect(cellPositions, attackEnemyAtPosition, this); 
};


module.exports = PlayerActionsState;