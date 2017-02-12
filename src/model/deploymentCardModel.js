function DeploymentCardModel(
    name,
    affiliation,
    deployCost,
    isUnique,
    gridSize,
    health,
    speed,
    defenseDice,
    attackType,
    attackDice,
    traits,
    naturalAbilities,
    passiveAbilities,
    actionAbilities)
{
    this.name = name;
    this.affiliation = affiliation;
    this.deployCost = deployCost;
    this.isUnique = isUnique;
    this.gridSize = gridSize;   
    this.baseHealth = health;
    this.baseSpeed = speed;

    this.currentHealth = this.maxHealth;
    this.currentSpeed = this.baseSpeed;
    this.defenseDice = defenseDice;
    this.attackType = attackType;
    this.attackDice = attackDice;

    this.traits = traits;
    this.naturalAbilities = naturalAbilities;
    this.passiveAbilities = passiveAbilities;
    this.actionAbilities = actionAbilities;
}

module.exports = DeploymentCardModel;