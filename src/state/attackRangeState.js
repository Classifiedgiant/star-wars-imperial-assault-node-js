let CalculateMovementUtilClass = require("../util/CalculateMovementUtil.js");

let AttackResultCalculatorUtilClass = require("../util/attackResultCalculatorUtil.js");


function AttackRangeState(models)
{
    this._levelModel = models.LevelModel;
    this._gameModel = models.GameModel;
}

AttackRangeState.prototype.start = function(transitionData) 
{
    console.assert(typeof(transitionData) === "object");
    console.assert(typeof(transitionData.selectedModel) === "object");
    console.assert(typeof(transitionData.target) === "object");

    this._selectedModel = transitionData.selectedModel;
    this._target = transitionData.target;

    // should do some checks here to see if:
    // There is more than one model 
    // The one model is an enemy model
    this._rangePath = CalculateMovementUtilClass.getShortestPath(this._levelModel, this._selectedModel.position, this._target.models[0].position);
    AttackResultCalculatorUtilClass.calculateAttackResult(this._selectedModel.getAttackDice(), this._target.models[0].getDefenseDice(), this._rangePath.pathSize);
};

AttackRangeState.prototype.update = function()
{
};

AttackRangeState.prototype.end = function()
{

};

module.exports = AttackRangeState;