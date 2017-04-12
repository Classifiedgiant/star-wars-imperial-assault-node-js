// transitionData
let SelectDeploymentForActionToPlayerActionTransitionDataClass = require("./transitions/SelectDeploymentForActionToPlayerActionTransitionData.js");

function MovePlayerState(models, levelView)
{
    this._gameModel = models.GameModel;
    this._levelModel = models.LevelModel;
    this._levelView = levelView;
    this._movingModel = null;
    this._position = null;
}

MovePlayerState.prototype.start = function(transitionData)
{
    console.assert(typeof(transitionData) === "object");
    console.assert(typeof(transitionData.movingModel) === "object");
    console.assert(typeof(transitionData.selectedPosition) === "object");
    console.assert(typeof(transitionData.moveCount) === "number");

    this._movingModel = transitionData.movingModel;
    this._position = transitionData.selectedPosition;
    this._moveCount = transitionData.moveCount;

    this._levelModel.moveModel(this._movingModel, this._position, this._moveCount);
};

MovePlayerState.prototype.update = function()
{
    this._gameModel.transitionData = new SelectDeploymentForActionToPlayerActionTransitionDataClass(this._movingModel);
    return "PLAYERS_ACTIONS";
};

MovePlayerState.prototype.end = function()
{
    
};

module.exports = MovePlayerState;