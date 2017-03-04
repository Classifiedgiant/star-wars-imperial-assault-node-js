function PlayerActionsState(gameModel, levelModel)
{
    this.gameModel = gameModel;
    this.levelModel = levelModel;
    this.actions = {
        MOVE_DEPLOYMENT: "MOVE_DEPLOYMENT",
        //INTERACT: "INTERACT",
        ATTACK_ENEMY: "ATTACK_ENEMY",
        END_ACTION: "END_ACTION"
    };
}

PlayerActionsState.prototype.start = function()
{
    //this.gameModel 
};

PlayerActionsState.prototype.update = function()
{

};

module.exports = PlayerActionsState;