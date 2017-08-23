let DeploymentCardModelClass =require("./deploymentCardModel.js");
let DeploymentCardsTypesUtilClass = require("./../util/deploymentCardsTypesUtil.js");


function DeploymentCardFigureModel(deploymentCard, position, isRotated, groupId)
{
    this.deploymentCard = deploymentCard;
    this.position = position;
    this.isRotated = true;
    this.currentSpeed = deploymentCard.baseSpeed;
    this.currentHealth = deploymentCard.baseHealth;
    this.actionCount = 2;
    this.items = [];

    this.groupId = groupId;
}

DeploymentCardFigureModel.prototype.canRangeAttack = function()
{
    return this.deploymentCard.attackType === DeploymentCardsTypesUtilClass.getAttackTypes().RANGE;
};

DeploymentCardFigureModel.prototype.canMeleeAttack = function()
{
    return this.deploymentCard.attackType === DeploymentCardsTypesUtilClass.getAttackTypes().MELEE;
};

DeploymentCardFigureModel.prototype.getAttackDice = function()
{
    return this.deploymentCard.attackDice;
};

DeploymentCardFigureModel.prototype.getDefenseDice = function()
{
    return this.deploymentCard.defenseDice;
};

DeploymentCardFigureModel.prototype.getSurgeAbilities = function()
{
    return this.deploymentCard.surgeAbilities;
};

DeploymentCardFigureModel.prototype.applyNaturalAbilities = function(attackResult)
{
    console.assert(typeof(attackResult) === "object");
    console.assert(typeof(attackResult.damage) === "number");
    console.assert(typeof(attackResult.surge) === "number");

    let naturalAbilities = this.deploymentCard.naturalAbilities;
    for (let i = 0; i < naturalAbilities.length; ++i)
    {
        let ability = naturalAbilities[i];
        if (ability.type === "Combat-Attack")
        {
            attackResult.damage += ability.value.damage;
            attackResult.surge += ability.value.surge;

        }
    }

    return attackResult;
};

DeploymentCardFigureModel.prototype.applyDamage = function(damage)
{
    console.assert(typeof(damage) === "number");
    this.currentHealth -= damage;
};

DeploymentCardFigureModel.prototype.isDead = function()
{
    return this.currentHealth <= 0;
};

DeploymentCardFigureModel.prototype.getActionCount = function() 
{
    return this.actionCount;
};

DeploymentCardFigureModel.prototype.decreaseActions = function() 
{
    this.actionCount--;
    return (this.actionCount === 0);
};



module.exports = DeploymentCardFigureModel;