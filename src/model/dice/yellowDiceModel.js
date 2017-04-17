function YellowDiceModel()
{
    this._faces = [
        {distance: 0, damage: 0, surge: 1},
        {distance: 0, damage: 1, surge: 2},
        {distance: 1, damage: 2, surge: 0},
        {distance: 1, damage: 1, surge: 1},
        {distance: 2, damage: 0, surge: 2},
        {distance: 2, damage: 2, surge: 0}
    ];
}

YellowDiceModel.prototype.rollDice = function()
{
    return this._faces[Math.floor(Math.random() * 6)];
};

module.exports = YellowDiceModel;