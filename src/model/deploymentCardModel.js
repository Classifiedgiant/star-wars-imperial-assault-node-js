function DeploymentCardModel(
    name,
    affiliation,
    deployCost,
    figureCount,
    isUnique,
    gridSize,
    health,
    speed,
    defenseDice,
    attackType,
    attackDice,
    traits,
    naturalAbilities,
    surgeAbilities,
    passiveAbilities,
    actionAbilities)
{
    this.name = name;
    this.affiliation = affiliation;
    this.deployCost = deployCost;
    this.figureCount = figureCount;
    this.isUnique = isUnique;
    this.gridSize = gridSize;   
    this.baseHealth = health;
    this.baseSpeed = speed;

    this.defenseDice = defenseDice;
    this.attackType = attackType;
    this.attackDice = attackDice;

    this.traits = traits;
    this.naturalAbilities = naturalAbilities;
    this.surgeAbilities = surgeAbilities;
    this.passiveAbilities = passiveAbilities;
    this.actionAbilities = actionAbilities;
}

module.exports = DeploymentCardModel;