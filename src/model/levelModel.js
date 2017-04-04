let DeploymentCardsTypeUtilClass = require("./../util/deploymentCardsTypesUtil.js");

let _ = require("underscore");

function TestLineOfSight(attackPos, defenderCornerPos)
{
	//let hasLineOfSight = true;
	let line1 = {pos1: attackPos, pos2: defenderCornerPos};
	//let line2 = {pos1: attackPos, pos2: linePos2}

	let line1Ax = line1.pos2.y - line1.pos1.y;
	let line1By = line1.pos1.x - line1.pos2.x;
	let line1C = (line1Ax * line1.pos1.x) + (line1By * line1.pos2.y);

	for ( i = 0; i < this.blockingLine.length; ++i)
	{
		let blockingLine = this.blockingLine[i];
		let blockingLineAx = blockingLine.point2.y - blockingLine.point1.y;
		let blockingLineBy = blockingLine.point1.x - blockingLine.point2.x;
		let blockingLineC = (blockingLineAx * blockingLine.point1.x) + (blockingLineBy * blockingLine.point2.y);

		let determinant = (line1Ax * blockingLineBy) - (line1By * blockingLineAx);
		if (determinant === 0)
			// Lines are parallel not intersection
			return null;
		else
		{
			let xIntersect = ((blockingLineBy*line1C) - (line1By*blockingLineC))/determinant;
			let yIntersect = ((line1Ax*blockingLineC) - (blockingLineAx*line1C))/determinant;
			if (Math.min(line1.pos1.x, line1.pos2.x) < xIntersect && xIntersect < Math.max(line1.pos1.x, line1.pos2.x))
			{
				if (Math.min(line1.pos1.y, line1.pos2.y) < yIntersect && yIntersect < Math.max(line1.pos1.y, line1.pos2.y))
				{
					return {x: xIntersect, y:yIntersect};
				}
			}
		}
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

LevelModel.prototype.isVisibleToEachOther = function(fromPosition, toPosition)
{
	let tl = 0x01;
	let tr = 0x02;
	let bl = 0x04;
	let br = 0x08;

	function getCornerPositionFromCell(position, corner)
	{
		let positionX = position.x * this.cellLength;
		let positionY = position.y * this.cellLength;
		if (corner === tl)
			return {x: positionX, y: positionY};
		else if (corner === tr)
			return {x: positionX + this.cellLength, y: positionY};
		else if (corner === bl)
			return {x: positionX, y: positionY + this.cellLength};
		else if (corner === br)
			return {x: positionX + this.cellLength, y: positionY + this.cellLength};
		else
			console.log("LevelModel.getCornerPositionFromCell: unknown corner - " + corner);
	}

	function findBestVisibleCorners(position, targetPosition, xDiff, yDiff)
	{
		let attackerCornerPositions = [];
		let targetTestCorners = [];

		if (xDiff > 0)
		{
			if (yDiff > 0)
			{
				attackerCornerPositions.push(getCornerPositionFromCell.call(this, position, tr));
				attackerCornerPositions.push(getCornerPositionFromCell.call(this, position, br));
				attackerCornerPositions.push(getCornerPositionFromCell.call(this, position, bl));

				let targetTL = getCornerPositionFromCell.call(this, targetPosition, tl);
				let targetTR = getCornerPositionFromCell.call(this, targetPosition, tr);
				let targetBL = getCornerPositionFromCell.call(this, targetPosition, bl);

				let line1 = {point1: targetTL, point2: targetTR};
				let line2 = {point1: targetBL, point2: targetTL};
				targetTestCorners.push(line1);
				targetTestCorners.push(line2);
			}
			else if (yDiff < 0)
			{
				attackerCornerPositions.push(getCornerPositionFromCell.call(this, position, tl));
				attackerCornerPositions.push(getCornerPositionFromCell.call(this, position, tr));
				attackerCornerPositions.push(getCornerPositionFromCell.call(this, position, br));

				let targetTL = getCornerPositionFromCell.call(this, targetPosition, tl);
				let targetBL = getCornerPositionFromCell.call(this, targetPosition, bl);
				let targetBR = getCornerPositionFromCell.call(this, targetPosition, br);

				let line1 = {point1: targetTL, point2: targetBL};
				let line2 = {point1: targetBL, point2: targetBR};
				targetTestCorners.push(line1);
				targetTestCorners.push(line2);
			}
			else if (yDiff === 0)
			{
				attackerCornerPositions.push(getCornerPositionFromCell.call(this, position, tr));
				attackerCornerPositions.push(getCornerPositionFromCell.call(this, position, br));

				let targetTL = getCornerPositionFromCell.call(this, targetPosition, tl);
				let targetBL = getCornerPositionFromCell.call(this, targetPosition, bl);

				let line1 = {point1: targetTL, point2: targetBL};
				targetTestCorners.push(line1);
			}
		}
		else if (xDiff < 0)
		{
			if (yDiff > 0)
			{
				attackerCornerPositions.push(getCornerPositionFromCell.call(this, position, br));
				attackerCornerPositions.push(getCornerPositionFromCell.call(this, position, bl));
				attackerCornerPositions.push(getCornerPositionFromCell.call(this, position, tl));

				let targetTL = getCornerPositionFromCell.call(this, targetPosition, tl);
				let targetTR = getCornerPositionFromCell.call(this, targetPosition, tr);
				let targetBR = getCornerPositionFromCell.call(this, targetPosition, br);

				let line1 = {point1: targetTL, point2: targetTR};
				let line2 = {point1: targetTR, point2: targetBR};
				targetTestCorners.push(line1);
				targetTestCorners.push(line2);
			}
			else if (yDiff < 0)
			{
				attackerCornerPositions.push(getCornerPositionFromCell.call(this, position, bl));
				attackerCornerPositions.push(getCornerPositionFromCell.call(this, position, tl));
				attackerCornerPositions.push(getCornerPositionFromCell.call(this, position, tr));

				let targetTR = getCornerPositionFromCell.call(this, targetPosition, tr);
				let targetBR = getCornerPositionFromCell.call(this, targetPosition, br);
				let targetBL = getCornerPositionFromCell.call(this, targetPosition, bl);

				let line1 = {point1: targetTR, point2: targetBR};
				let line2 = {point1: targetBR, point2: targetBL};
				targetTestCorners.push(line1);
				targetTestCorners.push(line2);
			}
			else if (yDiff === 0)
			{
				attackerCornerPositions.push(getCornerPositionFromCell.call(this, position, bl));
				attackerCornerPositions.push(getCornerPositionFromCell.call(this, position, tl));

				let targetTR = getCornerPositionFromCell.call(this, targetPosition, tr);
				let targetBR = getCornerPositionFromCell.call(this, targetPosition, br);

				let line1 = {point1: targetTR, point2: targetBR};
				targetTestCorners.push(line1);
			}
		}
		else if (xDiff === 0)
		{
			if (yDiff > 0)
			{
				attackerCornerPositions.push(getCornerPositionFromCell.call(this, position, bl));
				attackerCornerPositions.push(getCornerPositionFromCell.call(this, position, br));

				let targetTL = getCornerPositionFromCell.call(this, targetPosition, tl);
				let targetTR = getCornerPositionFromCell.call(this, targetPosition, tr);

				let line1 = {point1: targetTL, point2: targetTR};
				targetTestCorners.push(line1);
			}
			if (yDiff < 0)
			{
				attackerCornerPositions.push(getCornerPositionFromCell.call(this, position, tl));
				attackerCornerPositions.push(getCornerPositionFromCell.call(this, position, tr));

				let targetBL = getCornerPositionFromCell.call(this, targetPosition, bl);
				let targetBR = getCornerPositionFromCell.call(this, targetPosition, br);

				let line1 = {point1: targetBL, point2: targetBR};
				targetTestCorners.push(line1);
			}
			if (yDiff === 0)
			{
				console.log("LevelModel.isVisibleToEachOther: positions are the same!");
				return null;
			}
		}

		return {position: attackerCornerPositions, targetLines: targetTestCorners};
	}

	// get position from one to the other
	let xDiff = toPosition.x - fromPosition.x;
	let yDiff = toPosition.y - fromPosition.y;

	let cornerToTest = findBestVisibleCorners.call(this, fromPosition, toPosition, xDiff, yDiff);
	
	// testLines
	let fromPositionsCorners = cornerToTest.position;
	let targetPositionLines = cornerToTest.targetLines;

	for (let i = 0; i < fromPositionsCorners.length; ++i)
	{
		let positionToTest = fromPositionsCorners[i];
		for (let j = 0; j < targetPositionLines.length; ++j)
		{
			let linePos1 = targetPositionLines[j].point1;
			let linePos2 = targetPositionLines[j].point2;

			if (TestLineOfSight.call(this, positionToTest, linePos1) === null &&
				TestLineOfSight.call(this, positionToTest, linePos2) === null)
			{
				// we have line of site
				return true;
			}
		}
	}
	
	return false;
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