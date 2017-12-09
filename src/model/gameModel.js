let DeploymentCardModelClass = require("./deploymentCardModel.js");
let DeploymentCardFigureModelClass = require("./deploymentCardFigureModel.js");

let DeploymentCardsTypeUtilClass = require("./../util/deploymentCardsTypesUtil.js");

let _ = require("underscore");

function GameModel(states, currentState)
{
    this.currentSide = DeploymentCardsTypeUtilClass.getAffiliations().REBEL;
    this.states = null;
    this.currentState = null;
    this.transitionData = null;
    this.empire = {commandCards: null, deploymentCards: [], aliveFigures: [], victoryPoints: 0};
    this.rebel = {commandCards: null, deploymentCards: [], aliveFigures: [], victoryPoints: 0};
    this.createArmies();
}

GameModel.prototype.setupGame = function(states, currentState)
{
    this.states = states;
    this.currentState = currentState;
    this.currentState.start();
};

GameModel.prototype.createArmies = function()
{
    let defenseDice = DeploymentCardsTypeUtilClass.getDefenseDiceTypes();
    let attackTypes = DeploymentCardsTypeUtilClass.getAttackTypes();
    let attackDice = DeploymentCardsTypeUtilClass.getAttackDiceTypes();

    // create Luke Skywalker
    let lukeSkywalker = new DeploymentCardModelClass(
        "Luke Skywalker",
        DeploymentCardsTypeUtilClass.getAffiliations().REBEL,
        10,
        1,
        true,
        [1, 1],
        10,
        5,
        [defenseDice.WHITE],
        attackTypes.RANGE,
        [attackDice.BLUE, attackDice.GREEN, attackDice.YELLOW],
        ["Force User"], // could be placed into a group somewhere
        [{type: "Combat-Attack", value: {damage: 1, surge: 0}}],
        [{damage: 2}, {health: 2}, {accuracy: 2}],
        null,
        null);

    // empire
    // let darthVader = new DeploymentCardModelClass(
    //     "Darth Vader",
    //     DeploymentCardsTypeUtilClass.getAffiliations().EMPIRE,
    //     18,
    //     1,
    //     true,
    //     [1,1],
    //     16,
    //     4,
    //     [defenseDice.BLACK,defenseDice.BLACK],
    //     attackTypes.MELEE,
    //     [attackDice.RED, attackDice.RED, attackDice.YELLOW],
    //     ["Force User", "Leader", "Brawler"],
    //     null,
    //     null,
    //     null, 
    //     null);

    let stormtrooper = new DeploymentCardModelClass(
        "Stormtrooper",
        DeploymentCardsTypeUtilClass.getAffiliations().EMPIRE,
        6,
        3,
        false,
        [1, 1],
        3,
        4,
        [defenseDice.BLACK],
        attackTypes.RANGE,
        [attackDice.BLUE, attackDice.GREEN],
        ["Trooper"],
        null,
        [{damage: 1}, {accuracy: 2}],
        null,
        null);

    this.rebel.deploymentCards.push(lukeSkywalker);
    this.empire.deploymentCards.push(stormtrooper);
};

GameModel.prototype.setStartPositions = function(levelModel)
{
    let rebelFigure = new DeploymentCardFigureModelClass(this.rebel.deploymentCards[0], {x:0, y:0}, false, 0);
    this.rebel.aliveFigures.push(rebelFigure);
    levelModel.setGridContent(rebelFigure);

    let numberOfModels = this.empire.deploymentCards[0].figureCount;
    let groupCount = 0;
    let xPos = 2;

    for (let i = 0; i < numberOfModels; ++i)
    {
        let trooperFigure = new DeploymentCardFigureModelClass(this.empire.deploymentCards[0], {x:xPos, y:4}, false, groupCount);
        this.empire.aliveFigures.push(trooperFigure);
        levelModel.setGridContent(trooperFigure);
        xPos++;
    }
};

GameModel.prototype.getCurrentSide = function()
{
    return this.currentSide;
};

GameModel.prototype.updateState = function()
{
    let changeState = this.currentState.update();

    if (changeState !== null && changeState !== undefined)
    {
        this.currentState.end();
        let newState = this.states[changeState];
        this.currentState = newState;
        this.currentState.start(this.transitionData);
        this.transitionData = null;
    }
};

GameModel.prototype.getEnemyArmy = function(affiliation)
{
    if (affiliation === DeploymentCardsTypeUtilClass.getAffiliations().EMPIRE)
        return this.rebel.aliveFigures;
    else if (affiliation === DeploymentCardsTypeUtilClass.getAffiliations().REBEL)
        return this.empire.aliveFigures;
    else 
        console.log("GameModel.getEnemyArmy: affiliation is not expected: " + affiliation);
};

GameModel.prototype.removeDeadModel = function(model)
{
    function filterFunction(figure)
    {
        return _.isEqual(figure, model);
    }

    function groupFilterFunction(figure)
    {
        return figure.groupId === model.groupId;
    }

    let enemyArmy = this.getEnemyArmy(this.currentSide);

    _.reject(enemyArmy, filterFunction, this);

    // check if model is part of a group
    if (_.find(enemyArmy, groupFilterFunction, this) === undefined)
    {
        // just killed the last group member
        if (this.currentSide === DeploymentCardsTypeUtilClass.getAffiliations().EMPIRE)
            this.empire.victoryPoints += model.deploymentCard.deployCost;
        else if (this.currentSide === DeploymentCardsTypeUtilClass.getAffiliations().REBEL)
            this.rebel.victoryPoints += model.deploymentCard.deployCost;
        else 
            console.log("GameModel.removeDeadModel: unknown model affiliation");
    }
};

module.exports = GameModel;