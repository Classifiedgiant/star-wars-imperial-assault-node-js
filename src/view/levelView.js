//let PIXI = require ("../pixi.min.js");

function LevelView(model, stage)
{
	this.model = model;
	this.containerPos = new PIXI.Point(500, 250);
	this.container = new PIXI.Container();
	this.container.position = this.containerPos;
	this.stage = stage;
	this.stage.addChild(this.container);
	
	this.graphics = new PIXI.Graphics();
	for (i = 0; i < this.model.getTotalGridSize(); ++i)	
	{
		let col = i % this.model.getGridSize();
		let row = Math.floor(i / this.model.getGridSize());
		if (this.model.getGridIndex(col, row) == 1 )
		{
			this.graphics.beginFill(0x00FF00);				
		}
		else
		{
			this.graphics.beginFill(0xFF0000);				
		}
		
		let cellSize = 50;
		console.log("Lockie " + row * cellSize);
		this.graphics.drawRect(row * cellSize, col * cellSize, cellSize, cellSize);


	}
	this.container.addChild(this.graphics);
}


module.exports = LevelView;