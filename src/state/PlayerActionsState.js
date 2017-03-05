let CalculateMovementUtilClass = require ("./../util/calculateMovementUtil.js");

function PlayerActionsState(models)
{
    this.gameModel = models.GameModel;
    this.levelModel = models.LevelModel;
    this.actions = {
        MOVE_DEPLOYMENT: "MOVE_DEPLOYMENT",
        //INTERACT: "INTERACT",
        ATTACK_ENEMY: "ATTACK_ENEMY",
        END_ACTION: "END_ACTION"
    };
}

PlayerActionsState.prototype.start = function()
{
    let selectedModel = this.gameModel.selectedModel;
    let possibleMovement = CalculateMovementUtilClass.calculateMovementLength(this.levelModel, selectedModel);
    this.levelModel.showMovementHighlight(possibleMovement);
};

PlayerActionsState.prototype.update = function()
{
    return null;
};

PlayerActionsState.prototype.end = function()
{

};

module.exports = PlayerActionsState;