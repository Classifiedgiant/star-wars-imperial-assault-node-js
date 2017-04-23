//transition
let AttackRangeStateToPlayerActionTransitionDataClass = require("./transitions/attackRangeToPlayerActionTransitionData.js");

// context
let SurgeContextMenuView = require("../view/SurgeContextMenuView.js");

let AttackResultCalculatorUtilClass = require("../util/attackResultCalculatorUtil.js");
let CalculateMovementUtilClass = require("../util/CalculateMovementUtil.js");

let _ = require('underscore');

function selectedSurge(surgeSelected)
{
    function filterFunction(surgeElement)
    {
        return _.isEqual(surgeElement, surgeSelected);
    }

    for (let keyValuePair in surgeSelected)
    {
        if (keyValuePair === "damage")
            this._attackResults.damage += surgeSelected[keyValuePair];
        else if (keyValuePair === "accuracy")
            this._attackResults.distance += surgeSelected[keyValuePair];
        else if (keyValuePair === "health")
            this._selectedModel.currentHealth += surgeSelected[keyValuePair];
    }

    this._filteredSurges = _.reject(this._filteredSurges, filterFunction, this);

    this._attackResults.surge--;

    // check if we are done selecting surge abilities
    if (this._attackResults.surge === 0 || this._filteredSurges.length === 0)
        this._selectedSurges = true;
}

function AttackRangeState(stage, models)
{
    this._stage = stage;
    this._levelModel = models.LevelModel;
    this._gameModel = models.GameModel;
    this._filteredSurges = [];
    this._selectedSurges = false;

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
    this._attackResults = AttackResultCalculatorUtilClass.rollDice(this._selectedModel.getAttackDice(), this._target.models[0].getDefenseDice());
    this._attackResults = this._selectedModel.applyNaturalAbilities(this._attackResults);
    // apply target natural defenses here!!

    if (this._attackResults.surge > 0)
    { 
        this._filteredSurges = this._selectedModel.getSurgeAbilities();
        this._surgeContextMenuView.displayMenu(this._filteredSurges, this, selectedSurge);
    }
    else
        this._selectedSurges = true;
    
};

AttackRangeState.prototype.update = function()
{
    if (this._selectedSurges)
    {
        let finalDamage = AttackResultCalculatorUtilClass.evaluateRangeAttack(this._attackResults,  this._rangePath.pathSize, this._target);
        this._target.models[0].applyDamage(finalDamage);

        this._gameModel.transitionData = new AttackRangeStateToPlayerActionTransitionDataClass(this._selectedModel);
        return "PLAYERS_ACTIONS";
    }

    this._surgeContextMenuView.displayMenu(this._filteredSurges, this, selectedSurge);

    return null;
};

AttackRangeState.prototype.end = function()
{
    console.log("We have left");
};

module.exports = AttackRangeState;