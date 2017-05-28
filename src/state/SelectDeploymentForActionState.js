let DeploymentCardsTypeUtilClass = require("../util/deploymentCardsTypesUtil.js");
let LevelModelUtilClass = require("../util/levelModelUtil.js");

// transitionData
let ToPlayerActionTransitionDataClass = require("./transitions/ToPlayerActionTransitionData.js");

function onClick(x, y)
{
    let model = this.levelModel.getGridContent(x, y).models[0];
    this.gameModel.transitionData = new ToPlayerActionTransitionDataClass(model);
}

function SelectDeploymentForActionState(models, views)
{
    this.currentSide = models.GameModel.getCurrentSide();
    this.levelModel = models.LevelModel;
    this.gameModel = models.GameModel;
    this.levelView = views.LevelView;
    this.selectedModel = null;
    this.selectablePositions = [];
}

SelectDeploymentForActionState.prototype.start = function()
{
    for (let i = 0; i < this.levelModel.getGridArea(); ++i)
    {
        let position = LevelModelUtilClass.indexToXY(this.levelModel.getGridLength(), i);
        let cellContent = this.levelModel.getGridContent(position.x, position.y);

        if (cellContent.models.length !== 0)
        {
            if (cellContent.models.length > 1)
                console.log("SelectDeploymentForActionState.Start: Cell " + position.x + ', '  + position.y + " has more than one model in it");
            
            // should only be one model in the list - or something is wrong!!
            let model = cellContent.models[0];
            if (model !== null &&  model.deploymentCard !== null && model.deploymentCard.affiliation === this.currentSide)
            {
                this.selectablePositions.push({x: position.x, y: position.y});
            }
        }
    }

    this.levelView.setTilesToSelect(this.selectablePositions, onClick, this);
};

SelectDeploymentForActionState.prototype.update = function()
{
    if (this.gameModel.transitionData !== null)
        return "PLAYERS_ACTIONS";
    
    return null;
};

SelectDeploymentForActionState.prototype.end = function()
{
    this.levelView.clearSelectableTiles(onClick);
    this.selectablePositions = [];
};

module.exports = SelectDeploymentForActionState; 