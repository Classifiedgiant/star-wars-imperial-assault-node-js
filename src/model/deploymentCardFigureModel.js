let DeploymentCardModelClass =require("./deploymentCardModel.js");
let DeploymentCardsTypesUtilClass = require("./../util/deploymentCardsTypesUtil.js");


function DeploymentCardFigureModel(deploymentCard, position, isRotated, groupId, modelId)
{
    this.deploymentCard = deploymentCard;
    this.position = position;
    this.isRotated = true;
    this.currentSpeed = deploymentCard.baseSpeed;
    this.currentHealth = deploymentCard.maxHealth;
    this.items = [];

    this.groupdId = groupId;
    this.modelId = modelId;
}

DeploymentCardFigureModel.prototype.canRangeAttack = function()
{
    return this.deploymentCard.attackType === DeploymentCardsTypesUtilClass.getAttackTypes().RANGE;
};

DeploymentCardFigureModel.prototype.canMeleeAttack = function()
{
    return this.deploymentCard.attackType === DeploymentCardsTypesUtilClass.getAttackTypes().MELEE;
};

module.exports = DeploymentCardFigureModel;