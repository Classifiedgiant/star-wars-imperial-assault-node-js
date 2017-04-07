let DeploymentCardModelClass =require("./deploymentCardModel.js"); 

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

module.exports = DeploymentCardFigureModel;