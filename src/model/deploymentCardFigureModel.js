let DeploymentCardModelClass =require("./deploymentCardModel.js"); 

function DeploymentCardFigureModel(deploymentCard, groupId, modelId)
{
    this.deploymentCard = deploymentCard;
    this.currentSpeed = deploymentCard.baseSpeed;
    this.currentHealth = deploymentCard.maxHealth;
    this.items = [];

    this.rotation = 0;

    this.groupdId = groupId;
    this.modelId = modelId;
}

module.exports = DeploymentCardFigureModel;