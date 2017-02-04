function LevelModel() {
	this.gridSize = 5;
	
	this.grid = [];
	
	for (i = 0; i < this.gridSize; ++i)
	{
		let newArray = [];
		for (j = 0; j < this.gridSize; ++j)
			newArray.push(1);
		
		this.grid.push(newArray);
}	}

LevelModel.prototype.getGridIndex = function (row, col)
{
	return this.grid[col][row];
}

LevelModel.prototype.getGridSize = function ()
{
	return this.gridSize;
}

LevelModel.prototype.getTotalGridSize = function ()
{
	return this.gridSize * this.gridSize;
}

module.exports = LevelModel;