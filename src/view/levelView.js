function LevelView(model, stage)
{
	this.model = model;
	this.containerPos = new PIXI.Point(500, 250);
	this.container = new PIXI.Container();
	this.container.position = this.containerPos;
	this.stage = stage;
	this.stage.addChild(this.container);
	this.graphics = new PIXI.Graphics();
	this.container.addChild(this.graphics);
}

LevelView.prototype.render = function()
{
	this.graphics.clear();

	for (i = 0; i < this.model.getTotalGridSize(); ++i)	
	{
		let col = i % this.model.getGridSize();
		let row = Math.floor(i / this.model.getGridSize());
		let cellContent = this.model.getGridContent(col, row);
		let cellContentTypes = this.model.getGridCellTypes();
		if (cellContent.type === cellContentTypes.EMPTY)
		{
			this.graphics.beginFill(0x00FF00);				
		}
		else if (cellContent.type === cellContentTypes.OCCUPIED_EMPIRE)
		{
			this.graphics.beginFill(0x666666);
		}
		else if (cellContent.type === cellContentTypes.OCCUPIED_REBEL)
		{
			this.graphics.beginFill(0x0000AA);
		}
		else if (cellContent.type === cellContentTypes.BLOCKED)
		{
			this.graphics.beginFill(0xFF0000);
		}
		else
			console.log("LevelView.ctor: unknown cellContent :" + cellContent);

		let cellSize = 50;
		this.graphics.drawRect(row * cellSize, col * cellSize, cellSize, cellSize);
	}
};


module.exports = LevelView;