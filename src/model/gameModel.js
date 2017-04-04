let DeploymentCardsModelClass = require("./deploymentCardModel.js");
let DeploymentCardsTypeUtilClass = require("./../util/deploymentCardsTypesUtil.js");

function GameModel(states, currentState)
{
    this.currentSide = DeploymentCardsTypeUtilClass.getAffiliations().REBEL;
    this.states = null;
    this.currentState = null;
    this.selectedModel = null;
    this.empire = {commandCards: null, deploymentCards: [], aliveDeploymentCards: []};
    this.rebel = {commandCards: null, deploymentCards: [], aliveDeploymentCards: []};
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
    //let deploymentCardUtil = new DeploymentCardsTypeUtilClass();
    let defenseDice = DeploymentCardsTypeUtilClass.getDefenseDiceTypes();
    let attackTypes = DeploymentCardsTypeUtilClass.getAttackTypes();
    let attackDice = DeploymentCardsTypeUtilClass.getAttackDiceTypes();

    // create Luke Skywalker
    let lukeSkywalker = new DeploymentCardsModelClass(
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
        null,
        null,
        null);

    // empire
    let darthVader = new DeploymentCardsModelClass(
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
        null);

    this.rebel.deploymentCards.push(lukeSkywalker);
    this.empire.deploymentCards.push(darthVader);
};

GameModel.prototype.setStartPositions = function(levelModel)
{
    let rebelDeploymentCard = {
        position: {x: 0, y: 0},
        isRotated: false,
        deploymentCard: this.rebel.deploymentCards[0]
    };

    let empireDeploymentCard = {
        position: {x: 4, y: 4},
        isRotated: false,
        deploymentCard: this.empire.deploymentCards[0]
    };

    this.rebel.aliveDeploymentCards.push(rebelDeploymentCard);
    this.empire.aliveDeploymentCards.push(empireDeploymentCard);

    levelModel.setGridContent(rebelDeploymentCard);
    levelModel.setGridContent(empireDeploymentCard);
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
        this.currentState.start();
    }
};

GameModel.prototype.getEnemyArmy = function(affiliation)
{
    if (affiliation === DeploymentCardsTypeUtilClass.getAffiliations().EMPIRE)
        return this.rebel.aliveDeploymentCards;
    else if (affiliation === DeploymentCardsTypeUtilClass.getAffiliations().REBEL)
        return this.empire.aliveDeploymentCards;
    else 
        console.log("GameModel.getEnemyArmy: affiliation is not expected: " + affiliation);
};

module.exports = GameModel;