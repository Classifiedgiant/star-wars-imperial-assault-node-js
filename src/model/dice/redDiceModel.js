function RedDiceModel()
{
    this._faces = [
        {distance: 0, damage: 1, surge: 0},
        {distance: 0, damage: 2, surge: 0},
        {distance: 0, damage: 2, surge: 0},
        {distance: 0, damage: 2, surge: 1},
        {distance: 0, damage: 3, surge: 0},
        {distance: 0, damage: 3, surge: 0}
    ];
}

RedDiceModel.prototype.rollDice = function()
{
    return this._faces[Math.floor(Math.random() * 6)];
};

module.exports = RedDiceModel;