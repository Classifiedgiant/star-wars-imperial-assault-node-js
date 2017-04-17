function BlackDiceModel()
{
    this._faces = [
        {damage: 1, surge: 0},
        {damage: 1, surge: 0},
        {damage: 2, surge: 0},
        {damage: 2, surge: 0},
        {damage: 3, surge: 0},
        {damage: 0, surge: 1}
    ];
}

BlackDiceModel.prototype.rollDice = function()
{
    return this._faces[Math.floor(Math.random() * 6)];
};

module.exports = BlackDiceModel;