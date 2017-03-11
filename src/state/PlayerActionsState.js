let CalculateMovementUtilClass = require ("./../util/calculateMovementUtil.js");

let _ = require('underscore');

function moveCharacter(x, y)
{
    this.movePositionSelected = {x: x, y: y};
    this.finishedMove = true;

}

function PlayerActionsState(models, levelView)
{
    this.gameModel = models.GameModel;
    this.levelModel = models.LevelModel;
    this.levelView = levelView;
    this.actions = {
        MOVE_DEPLOYMENT: "MOVE_DEPLOYMENT",
        //INTERACT: "INTERACT",
        ATTACK_ENEMY: "ATTACK_ENEMY",
        END_ACTION: "END_ACTION"
    };
    this.selectedModel = null;
    this.movementPositions= null;
    this.cellPositions= null;
    this.movePositionSelected = null;
    this.finishedMove = false;
}

PlayerActionsState.prototype.start = function()
{
    this.selectedModel = this.gameModel.selectedModel;
    this.calculateMovements();
};

PlayerActionsState.prototype.update = function()
{
    function filterFunction(cell)
    {
        return _.isEqual(cell.position, this.movePositionSelected);

    }
    if (this.finishedMove)
    {
        this.levelModel.moveModel(this.selectedModel, this.movePositionSelected);
        //this.levelModel.showMovementHighlight([]);
        this.levelView.clearSelectableTiles();
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


module.exports = PlayerActionsState;