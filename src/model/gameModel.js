let DeploymentCardModelClass = require("./deploymentCardModel.js");
let DeploymentCardFigureModelClass = require("./deploymentCardFigureModel.js");

let DeploymentCardsTypeUtilClass = require("./../util/deploymentCardsTypesUtil.js");

function GameModel(states, currentState)
{
    this.currentSide = DeploymentCardsTypeUtilClass.getAffiliations().REBEL;
    this.states = null;
    this.currentState = null;
    this.transitionData = null;
    this.empire = {commandCards: null, deploymentCards: [], aliveFigures: []};
    this.rebel = {commandCards: null, deploymentCards: [], aliveFigures: []};
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
    let darthVader = new DeploymentCardModelClass(
        "Darth Vader",
        DeploymentCardsTypeUtilClass.getAffiliations().EMPIRE,
        18,
        1,
        true,
        [1,1],
        16,
        4,
        [defenseDice.BLACK,defenseDice.BLACK],
        attackTypes.MELEE,
        [attackDice.RED, attackDice.RED, attackDice.YELLOW],
        ["Force User", "Leader", "Brawler"],
        null,
        null,
        null, 
        null);

    this.rebel.deploymentCards.push(lukeSkywalker);
    this.empire.deploymentCards.push(darthVader);
};

GameModel.prototype.setStartPositions = function(levelModel)
{
    let rebelFigure = new DeploymentCardFigureModelClass(this.rebel.deploymentCards[0], {x:0, y:0}, false, 0, 0);
    let empireFigure = new DeploymentCardFigureModelClass(this.empire.deploymentCards[0], {x:4, y:4}, false, 0, 0);

    this.rebel.aliveFigures.push(rebelFigure);
    this.empire.aliveFigures.push(empireFigure);

    levelModel.setGridContent(rebelFigure);
    levelModel.setGridContent(empireFigure);
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

module.exports = GameModel;