let DeploymentCardsTypeUtilClass = require("./../util/deploymentCardsTypesUtil.js");

function FindModelLocation(model)
{
	// this won't work with multi model per deployment (E.g. stormtroopers)
	let area = this.gridSize * this.gridSize;
	for (let i = 0; i < area; ++i)
	{
		let row = i / this.gridSize;
		let col = i % this.gridSize;
		let cellContent = this.getGridContent(col, row); 
		if (cellContent.model === model)
			return [col, row];
	}

	return null;
}

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

	CreateGrid.call(this);
}

LevelModel.prototype.getGridCellTypes = function ()
{
	return this.gridCellTypes;
};

LevelModel.prototype.getGridContent = function(row, col)
{
	return this.grid[col][row];
};

LevelModel.prototype.setGridContent = function(row, col, model)
{
	let cellContent = this.getGridContent(row, col);
	if (cellContent.type === this.gridCellTypes.EMPTY)
	{
		cellContent.model = model;
		if (model.affiliation === DeploymentCardsTypeUtilClass.getAffiliations().REBEL)
		{
			cellContent.type = this.gridCellTypes.OCCUPIED_REBEL;
		}
		else if (model.affiliation === DeploymentCardsTypeUtilClass.getAffiliations().EMPIRE)
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

LevelModel.prototype.showMovementHighlights = function(model)
{
	let position = FindModelLocation(model);
	if (position !== null)
	{
		//let model
	}
};

module.exports = LevelModel;