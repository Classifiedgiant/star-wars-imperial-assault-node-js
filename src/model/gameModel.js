let DeploymentCardsModelClass = require("./deploymentCardModel.js");
let DeploymentCardsTypeUtilClass = require("./deploymentCardTypesUtil.js");

function GameModel(levelModel)
{
    this.empire = {commandCards: null, deploymentCards: [], aliveDeploymentCards: []};
    this.rebel = {commandCards: null, deploymentCards: [], aliveDeploymentCards: []};
    this.createArmies();
}

GameModel.prototype.createArmies = function()
{
    let deploymentCardUtil = new DeploymentCardsTypeUtilClass();
    let defenseDice = deploymentCardUtil.getDefenseDiceTypes();
    let attackTypes = deploymentCardUtil.getAttackTypes();
    let attackDice = deploymentCardUtil.getAttackDiceTypes();

    // create Luke Skywalker
    let lukeSkywalker = new DeploymentCardsModelClass(
        "Luke Skywalker",
        deploymentCardUtil.getAffiliations().REBEL,
        10,
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
        deploymentCardUtil.getAffiliations().EMPIRE,
        18,
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
        gridPosition: [0,0],
        isRotated: false,
        deploymentCard: this.rebel.deploymentCards[0]
    };

    let empireDeploymentCard = {
        gridPosition: [4,4],
        isRotated: false,
        deploymentCard: this.empire.deploymentCards[0]
    };

    this.rebel.aliveDeploymentCards.push(rebelDeploymentCard);
    this.empire.aliveDeploymentCards.push(empireDeploymentCard);

    levelModel.setGridContent(0, 0, rebelDeploymentCard.deploymentCard);
    levelModel.setGridContent(4, 4, empireDeploymentCard.deploymentCard);
};

module.exports = GameModel;