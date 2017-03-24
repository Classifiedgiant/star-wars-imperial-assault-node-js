let DeploymentCardsTypeUtilClass = require("./../util/deploymentCardsTypesUtil.js");

let _ = require("underscore");

function LevelModel() 
{
	function CreateGrid()
	{
		for (let i = 0; i < this.gridSize; ++i)
		{
			let newArray = [];
			for (j = 0; j < this.gridSize; ++j)
				newArray.push({type: this.gridCellTypes.EMPTY, models: []});
			this.grid.push(newArray);
		}	

		this._setBlockingCell(1, 3);
		this._setBlockingCell(3, 1);
	}

	this.gridCellTypes = {
		EMPTY: 1,
		BLOCKED: 2
	};

	this.gridSize = 5;
	this.cellLength = 50;
	this.grid = [];
	this.blockingLine = [];
	this.possibleMovePositions = [];

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
		cellContent.models.push(model);
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

	let index = cellContent.models.indexOf(model);
	cellContent.models.splice(index, 1);
	newCellContent.models.push(model);

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

LevelModel.prototype.getPossibleMovePositions = function()
{
	return this.possibleMovePositions;
};

LevelModel.prototype.showMovementHighlight = function(possibleMovePositions)
{
	this.possibleMovePositions = possibleMovePositions;
};

LevelModel.prototype.getArmyModelsInCell = function(position, affiliation)
{
	let models = this.getGridContent(position.x, position.y);
	return _.findWhere(models, {deploymentCard: {affiliation: affiliation}});
};

LevelModel.prototype.isVisibleToEachOther = function(fromPositiom, toPosition)
{
	// figure
};

LevelModel.prototype._setBlockingCell = function(x, y)
{
	this.getGridContent(x, y).type = this.gridCellTypes.BLOCKED;

	let topLeft = {x: x * this.cellLength, y: y * this.cellLength};
	let topRight = {x: (x+1) * this.cellLength, y: y * this.cellLength};
	let bottomLeft = {x: x * this.cellLength, y: (y+1) * this.cellLength};
	let bottomRight = {x: (x+1) * this.cellLength, y: (y+1) * this.cellLength};

	// blockingLine
	let topBlockingLine = { point1: topLeft, point2: topRight};
	let leftBlockingLine = { point1: topLeft, point2: bottomLeft};
	let rightBlockingLine = { point1: topRight, point2: bottomRight};
	let bottomBlockingLine = { point1: bottomLeft, point2: bottomRight};

	this.blockingLine.push(topBlockingLine);
	this.blockingLine.push(leftBlockingLine);
	this.blockingLine.push(rightBlockingLine);
	this.blockingLine.push(bottomBlockingLine);
};

module.exports = LevelModel;