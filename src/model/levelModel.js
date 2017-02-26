let DeploymentCardsTypeUtilClass = require("./deploymentCardTypesUtil.js");

function LevelModel() 
{
	this.gridCellTypes = {
		EMPTY: 1,
		OCCUPIED_EMPIRE: 2,
		OCCUPIED_REBEL: 3,
		BLOCKED: 4
	};

	this.gridSize = 5;

	this.grid = [];

	for (i = 0; i < this.gridSize; ++i)
	{
		let newArray = [];
		for (j = 0; j < this.gridSize; ++j)
			newArray.push({type: this.gridCellTypes.EMPTY, model: null});
		this.grid.push(newArray);
	}	

	this.getGridContent(1, 3).type = this.gridCellTypes.BLOCKED;
	this.getGridContent(3, 1).type = this.gridCellTypes.BLOCKED;
}

LevelModel.prototype.getGridCellTypes = function ()
{
	return this.gridCellTypes;
};

LevelModel.prototype.getGridContent = function (row, col)
{
	return this.grid[col][row];
};

LevelModel.prototype.setGridContent = function(row, col, model)
{
	let cellContent = this.getGridContent(row, col);
	if (cellContent.type === this.gridCellTypes.EMPTY)
	{
		let deploymentCardUtil = new DeploymentCardsTypeUtilClass();
		
		cellContent.model = model;
		if (model.affiliation === deploymentCardUtil.getAffiliations().REBEL)
		{
			cellContent.type = this.gridCellTypes.OCCUPIED_REBEL;
		}
		else if (model.affiliation === deploymentCardUtil.getAffiliations().EMPIRE)
		{
			cellContent.type = this.gridCellTypes.OCCUPIED_EMPIRE;
		}
		else
		{
			console.log("LevelModel.setGridContent: incorrect affiliation found");
		}
	}
};

LevelModel.prototype.getGridSize = function ()
{
	return this.gridSize;
};

LevelModel.prototype.getTotalGridSize = function ()
{
	return this.gridSize * this.gridSize;
};

module.exports = LevelModel;