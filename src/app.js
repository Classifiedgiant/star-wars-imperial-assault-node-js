
let GameModelClass = require ("./model/gameModel.js");
let LevelModelClass = require ("./model/levelModel.js");

let GameViewClass = require ("./view/gameView.js");
let LevelViewClass = require ("./view/levelView.js");


function App(stage)
{
    this.models = {
        GameModel: new GameModelClass(),
        LevelModel: new LevelModelClass(),
    };

    this.views = {
        GameView: new GameViewClass(),
        LevelView: new LevelViewClass(this.models.LevelModel, stage),
    };

    this.states = {
        SELECT_DEPLOYMENT_CARDS: "SELECT_DEPLOYMENT_CARDS",
        SELECT_DEPLOYMENTS_PLACE: "SELECT_DEPLOYMENT_PLACE"
    };

    this.stage = stage;
}

App.prototype.setupGame = function()
{
    this.models.GameModel.setStartPositions(this.models.LevelModel);
};

App.prototype.render = function()
{
    this.views.LevelView.render();
};

module.exports = App;