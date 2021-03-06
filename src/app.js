
let GameModelClass = require ("./model/gameModel.js");
let LevelModelClass = require ("./model/levelModel.js");

let LevelViewClass = require ("./view/levelView.js");

let DeploymentCardsTypeUtilClass = require("./util/deploymentCardsTypesUtil.js");

// states
let PlayerActionStateClass = require("./state/playerActionsState.js");
let SelectDeploymentForActionClass = require("./state/SelectDeploymentForActionState.js");
let MovePlayerStateClass = require("./state/movePlayerState.js");
let AttackRangeStateClass = require("./state/attackRangeState.js");
let SwapArmyStateClass = require("./state/swapArmyState.js");

function App(stage)
{
    this.stage = stage;
    this.states = null;

    this.models = {
        GameModel: new GameModelClass(),
        LevelModel: new LevelModelClass(),
    };

    this.views = {
        LevelView: new LevelViewClass(this.models.LevelModel, stage)
    };
}
 
App.prototype.setupGame = function()
{
    function createStates(self)
    {
        self.states = {
            SELECT_DEPLOYMENT_CARDS: "SELECT_DEPLOYMENT_CARDS",
            SELECT_DEPLOYMENT_FOR_ACTIONS: new SelectDeploymentForActionClass(self.models, self.views), 
            PLAYERS_ACTIONS: new PlayerActionStateClass(self.stage, self.models, self.views.LevelView),
            MOVE_MODEL: new MovePlayerStateClass(self.models, self.views.LevelView),
            ATTACK_ENEMY_RANGED: new AttackRangeStateClass(self.stage, self.models),
            SWAP_ARMY: new SwapArmyStateClass()
        };
    }

    createStates(this);
    this.models.GameModel.setStartPositions(this.models.LevelModel);
    this.models.GameModel.setupGame(this.states, this.states.SELECT_DEPLOYMENT_FOR_ACTIONS);
};

App.prototype.update = function()
{
    this.models.GameModel.updateState();
};

App.prototype.render = function()
{
    this.views.LevelView.render();
};

module.exports = App;