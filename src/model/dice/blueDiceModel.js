function BlueDiceModel()
{
    this._faces = [
        {distance: 2, damage: 0, surge: 1},
        {distance: 2, damage: 2, surge: 0},
        {distance: 3, damage: 2, surge: 0},
        {distance: 3, damage: 1, surge: 1},
        {distance: 4, damage: 2, surge: 0},
        {distance: 5, damage: 1, surge: 0}
    ];
}

BlueDiceModel.prototype.rollDice = function()
{
    return this._faces[Math.floor(Math.random() * 6)];
};

module.exports = BlueDiceModel;