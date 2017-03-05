let DeploymentCardsTypeUtilClass = require("./../util/deploymentCardsTypesUtil.js");

function onClick(col, row)
{
    this.gameModel.selectedModel = this.levelModel.getGridContent(col, row).model; 
}

function SelectDeploymentForActionState(models, views)
{
    this.currentSide = models.GameModel.getCurrentSide();
    this.levelModel = models.LevelModel;
    this.gameModel = models.GameModel;
    this.levelView = views.LevelView;
    this.selectedModel = null;
}

SelectDeploymentForActionState.prototype.start = function()
{
    for (let i = 0; i < this.levelModel.getGridArea(); ++i)
    {
        let col = i % this.levelModel.getGridLength();
        let row = Math.floor(i / this.levelModel.getGridLength());
        let cellContent = this.levelModel.getGridContent(col, row);
        if (cellContent.model !== null &&  cellContent.model.deploymentCard !== null && cellContent.model.deploymentCard.affiliation === this.currentSide)
        {
            let cellGraphics = this.levelView.getCellGraphics(i);
            cellGraphics.interactive = true;
            cellGraphics.buttonMode = true;
            cellGraphics.on("pointerdown", onClick.bind(this, col, row));
        }
    }
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
    for (let i = 0; i < this.levelModel.getGridArea(); ++i)
    {
        let col = i % this.levelModel.getGridLength();
        let row = Math.floor(i / this.levelModel.getGridLength());
        let cellContent = this.levelModel.getGridContent(col, row);
        if (cellContent.model !== null && cellContent.model.affiliation === this.currentSide)
        {
            let cellGraphics = this.levelView.getCellGraphics(i);
            cellGraphics.interactive = false;
            cellGraphics.buttonMode = false;
            cellGraphics.on("pointerdown", null);
        }
    }
};

module.exports = SelectDeploymentForActionState; 