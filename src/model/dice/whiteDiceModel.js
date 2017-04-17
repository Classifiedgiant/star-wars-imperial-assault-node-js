function WhiteDiceModel()
{
    this._faces = [
        {damage: 0, surge: 0, evade: false},
        {damage: 1, surge: 0, evade: false},
        {damage: 0, surge: 1, evade: false},
        {damage: 1, surge: 1, evade: false},
        {damage: 1, surge: 1, evade: false},
        {evade: true}
    ];
}

WhiteDiceModel.prototype.rollDice = function()
{
    return this._faces[Math.floor(Math.random() * 6)];
};

module.exports = WhiteDiceModel;