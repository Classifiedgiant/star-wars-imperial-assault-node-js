
let GameModelClass = require ("./model/gameModel.js");

function App()
{
    this.models = {
        GameModel: new GameModelClass()
    };

    this.states = {
        SELECT_DEPLOYMENT_CARDS: "SELECT_DEPLOYMENT_CARDS",
        SELECT_DEPLOYMENTS_PLACE: "SELECT_DEPLOYMENT_PLACE"
    };
}

App.prototype.setupGame = function()
{

};

module.exports = App;