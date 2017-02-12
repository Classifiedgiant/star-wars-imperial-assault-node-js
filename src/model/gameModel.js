let DeploymentCardsModelClass = require("./deploymentCardModel.js");
let DeploymentCardsTypeUtilClass = require("./deploymentCardTypesUtil.js");

function GameModel()
{
    this.imperial = {commandCards: null, deploymentCards: []};
    this.rebel = {commandCards: null, deploymentCards: []};
}

GameModel.prototype.createArmies = function()
{
    let defenseDice = DeploymentCardsTypeUtilClass.GetDefenseDiceTypes();
    let attackTypes = DeploymentCardsTypeUtilClass.GetAttackType();
    let attackDice = DeploymentCardsTypeUtilClass.GetAttackDiceTypes();

    // create Luke Skywalker
    let lukeSkywalker = new deploymentCardModel(
        "Luke Skywalker",
        DeploymentCardsTypeUtilClass.GetAffiliations().REBEL,
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
    let darthVader = new deploymentCardModel(
        "Darth Vader",
        DeploymentCardsTypeUtilClass.GetAffiliations().EMPIRE,
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
    this.imperial.deploymentCards.push(darthVader);
};

module.exports = GameModel;