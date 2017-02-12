function DeploymentCardTypesUtil()
{
}

DeploymentCardTypesUtil.prototype.GetAffiliations = function()
{
    return {
        REBEL: "Rebel Allicance",
        EMPIRE: "Empire",
        BOUNTY_HUNTERS: "Bounty Hunters"
    };
};

DeploymentCardTypesUtil.prototype.GetDefenseDiceTypes = function()
{
    return {
        BLACK: "Black",
        WHITE: "White"
    };
};

DeploymentCardTypesUtil.prototype.GetAttackTypes = function()
{
    return {
        MELEE: "Melee",
        RANGE: "Range"
    };
};

DeploymentCardTypesUtil.prototype.GetAttackDiceTypes = function()
{
    return {
        RED: "Red",
        YELLOW: "Yellow",
        BLUE: "Blue",
        GREEN: "Green"
    };
};

module.exports = DeploymentCardTypesUtil;