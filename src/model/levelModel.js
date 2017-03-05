let DeploymentCardsTypeUtilClass = require("./../util/deploymentCardsTypesUtil.js");

function LevelModel() 
{
	function CreateGrid()
	{
		for (let i = 0; i < this.gridSize; ++i)
		{
			let newArray = [];
			for (j = 0; j < this.gridSize; ++j)
				newArray.push({type: this.gridCellTypes.EMPTY, model: null});
			this.grid.push(newArray);
		}	

		this.getGridContent(1, 3).type = this.gridCellTypes.BLOCKED;
		this.getGridContent(3, 1).type = this.gridCellTypes.BLOCKED;
	}

	this.gridCellTypes = {
		EMPTY: 1,
		OCCUPIED_EMPIRE: 2,
		OCCUPIED_REBEL: 3,
		BLOCKED: 4
	};

	this.gridSize = 5;
	this.grid = [];
	this.possiblePositions = [];

	CreateGrid.call(this);
}

LevelModel.prototype.getGridCellTypes = function ()
{
	return this.gridCellTypes;
};

LevelModel.prototype.getGridContent = function(col, row)
{
	return this.grid[col][row];
};

LevelModel.prototype.setGridContent = function(col, row, model)
{
	let cellContent = this.getGridContent(row, col);
	if (cellContent.type === this.gridCellTypes.EMPTY)
	{
		cellContent.model = model;
		if (cellContent.model.deploymentCard.affiliation === DeploymentCardsTypeUtilClass.getAffiliations().REBEL)
		{
			cellContent.type = this.gridCellTypes.OCCUPIED_REBEL;
		}
		else if (cellContent.model.deploymentCard.affiliation === DeploymentCardsTypeUtilClass.getAffiliations().EMPIRE)
		{
			cellContent.type = this.gridCellTypes.OCCUPIED_EMPIRE;
		}
		else
		{
			console.log("LevelModel.setGridContent: incorrect affiliation found");
		}
	}
};

LevelModel.prototype.getGridLength = function ()
{
	return this.gridSize;
};

LevelModel.prototype.getGridArea = function ()
{
	return this.gridSize * this.gridSize;
};

LevelModel.prototype.getPossiblePositions = function()
{
	return this.possiblePositions;
};

LevelModel.prototype.showMovementHighlight = function(possiblePositions)
{
	this.possiblePositions = possiblePositions;
};

module.exports = LevelModel;