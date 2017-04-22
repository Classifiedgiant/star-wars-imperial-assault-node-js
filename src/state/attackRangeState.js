// context
let SurgeContextMenuView = require("../view/SurgeContextMenuView.js");

let AttackResultCalculatorUtilClass = require("../util/attackResultCalculatorUtil.js");
let CalculateMovementUtilClass = require("../util/CalculateMovementUtil.js");

function selectedSurge(surgeObjected)
{

}

function AttackRangeState(stage, models)
{
    this._stage = stage;
    this._levelModel = models.LevelModel;
    this._gameModel = models.GameModel;

    this._surgeContextMenuView = new SurgeContextMenuView(this._stage, {x: 0, y:0});
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
    this._attackResults = AttackResultCalculatorUtilClass.rollDice(this._selectedModel.getAttackDice(), this._target.models[0].getDefenseDice(), this._rangePath.pathSize);
    this._attackResults = this._selectedModel.applyNaturalAbilities(this._attackResults);
    this._surgeContextMenuView.displayMenu(this._selectedModel.getSurgeAbilities(), this, selectedSurge);
};

AttackRangeState.prototype.update = function()
{

};

AttackRangeState.prototype.end = function()
{

};

module.exports = AttackRangeState;