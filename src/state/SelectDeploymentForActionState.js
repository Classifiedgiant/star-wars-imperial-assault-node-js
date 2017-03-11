let DeploymentCardsTypeUtilClass = require("../util/deploymentCardsTypesUtil.js");
let LevelModelUtilClass = require("../util/levelModelUtil.js");

function onClick(x, y)
{
    this.gameModel.selectedModel = this.levelModel.getGridContent(x, y).model; 
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
        if (cellContent.model !== null &&  cellContent.model.deploymentCard !== null && cellContent.model.deploymentCard.affiliation === this.currentSide)
        {
            this.selectablePositions.push({x: position.x, y: position.y});
        }
    }

    this.levelView.setTilesToSelect(this.selectablePositions, onClick, this);
};

SelectDeploymentForActionState.prototype.update = function()
{
    if (this.gameModel.selectedModel !== null)
        return "PLAYERS_ACTIONS";
    else 
        return null;
};

SelectDeploymentForActionState.prototype.end = function()
{
    this.levelView.clearSelectableTiles();
    this.selectablePositions = [];
};

module.exports = SelectDeploymentForActionState; 