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
		BLOCKED: 2
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

LevelModel.prototype.setGridContent = function(model)
{
	let position = model.position;
	let cellContent = this.getGridContent(position.x, position.y);
	if (cellContent.type === this.gridCellTypes.EMPTY)
	{
		cellContent.model = model;
	}
	else
	{
		console.log("LevelModel.setGridContent: trying to set a model on a blocked cell");
	}
};

LevelModel.prototype.moveModel = function(model, position)
{
	let oldPosition = model.position;
	// clear old
	let cellContent = this.getGridContent(oldPosition.x, oldPosition.y);
	let newCellContent = this.getGridContent(position.x, position.y);

	newCellContent.model = model;
	cellContent.model = null;

	// set the model position - perhaps not ideal in here
	model.position = position;
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