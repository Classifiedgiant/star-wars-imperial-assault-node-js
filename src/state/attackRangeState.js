let CalculateMovementUtilClass = require("../util/CalculateMovementUtil.js");


function AttackRangeState()
{
    
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
    this._calculateRange = CalculateMovementUtilClass.getDistance(this._selectedModel.position, this._target.models[0].position);
};

AttackRangeState.prototype.update = function()
{

};

AttackRangeState.prototype.end = function()
{

};

module.exports = AttackRangeState;