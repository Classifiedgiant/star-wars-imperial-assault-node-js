function GreenDiceModel()
{
    this._faces = [
        {distance: 1, damage: 0, surge: 1},
        {distance: 1, damage: 1, surge: 1},
        {distance: 1, damage: 2, surge: 0},
        {distance: 2, damage: 1, surge: 1},
        {distance: 2, damage: 2, surge: 0},
        {distance: 3, damage: 2, surge: 0}
    ];
}

GreenDiceModel.prototype.rollDice = function()
{
    return this._faces[Math.floor(Math.random() * 6)];
};

module.exports = GreenDiceModel;