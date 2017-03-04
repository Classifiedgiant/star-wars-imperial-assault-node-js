function LevelView(model, stage)
{
	this.model = model;
	this.containerPos = new PIXI.Point(500, 250);
	this.container = new PIXI.Container();
	this.container.position = this.containerPos;
	this.stage = stage;
	this.stage.addChild(this.container);
	this.levelGraphics = [];

	for (i = 0; i < this.model.getGridArea(); ++i)
	{
		this.levelGraphics.push(new PIXI.Graphics());
		//this.levelGraphics[i].interactive = true;
		//this.levelGraphics[i].buttonMode = true;
		this.container.addChild(this.levelGraphics[i]);
	}
}

LevelView.prototype.getCellGraphics = function(index)
{
	if (index >= 0 && index < this.levelGraphics.length)
		return this.levelGraphics[index];
	else
		console.log("LevelView.getCellGraphics: index(" + index + ") is not with the correct bounds (0-" + this.levelGraphics.length + ")");
};

LevelView.prototype.render = function()
{
	for (i = 0; i < this.model.getGridArea(); ++i)	
	{
		let cellGraphics = this.levelGraphics[i];
		cellGraphics.clear();
		let col = i % this.model.getGridLength();
		let row = Math.floor(i / this.model.getGridLength());
		let cellContent = this.model.getGridContent(col, row);
		let cellContentTypes = this.model.getGridCellTypes();
		if (cellContent.type === cellContentTypes.EMPTY)
		{
			cellGraphics.beginFill(0x00FF00);				
		}
		else if (cellContent.type === cellContentTypes.OCCUPIED_EMPIRE)
		{
			cellGraphics.beginFill(0x666666);
		}
		else if (cellContent.type === cellContentTypes.OCCUPIED_REBEL)
		{
			cellGraphics.beginFill(0x0000AA);
		}
		else if (cellContent.type === cellContentTypes.BLOCKED)
		{
			cellGraphics.beginFill(0xFF0000);
		}
		else
			console.log("LevelView.ctor: unknown cellContent :" + cellContent);

		let cellSize = 50;
		cellGraphics.drawRect(row * cellSize, col * cellSize, cellSize, cellSize);
	}
};


module.exports = LevelView;