function DeploymentCardsTypesUtil()
{
}

DeploymentCardsTypesUtil.prototype.getAffiliations = function()
{
    return {
        REBEL: "Rebel Allicance",
        EMPIRE: "Empire",
        BOUNTY_HUNTERS: "Bounty Hunters"
    };
};

DeploymentCardsTypesUtil.prototype.getDefenseDiceTypes = function()
{
    return {
        BLACK: "Black",
        WHITE: "White"
    };
};

DeploymentCardsTypesUtil.prototype.getAttackTypes = function()
{
    return {
        MELEE: "Melee",
        RANGE: "Range"
    };
};

DeploymentCardsTypesUtil.prototype.getAttackDiceTypes = function()
{
    return {
        RED: "Red",
        YELLOW: "Yellow",
        BLUE: "Blue",
        GREEN: "Green"
    };
};

module.exports = DeploymentCardsTypesUtil;