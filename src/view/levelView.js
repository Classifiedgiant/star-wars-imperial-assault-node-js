let _ = require('underscore');
let DeploymentCardsTypeUtilClass = require("../util/deploymentCardsTypesUtil.js");
let LevelModelUtilClass = require("../util/LevelModelUtil.js");

function LevelView(model, stage)
{
	this.model = model;
	this.containerPos = new PIXI.Point(500, 250);
	this.container = new PIXI.Container();
	this.container.position = this.containerPos;
	this.stage = stage;
	this.stage.addChild(this.container);
	this.levelGraphics = [];
	this.selectablePositions = null;

	for (i = 0; i < this.model.getGridArea(); ++i)
	{
		this.levelGraphics.push(new PIXI.Graphics());
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
		let row = Math.floor(i / this.model.getGridLength());
		let col = i % this.model.getGridLength();
		let cellContent = this.model.getGridContent(col, row);
		let cellContentTypes = this.model.getGridCellTypes();
		if (cellContent.type === cellContentTypes.EMPTY)
		{
			if (cellContent.models.length === 0)
			{
				let found = false;
				let possibleMovePositions = this.model.getPossibleMovePositions(); 
				for (let i = 0; i < possibleMovePositions.length; ++i)
				{
					let possibleMovePosition = possibleMovePositions[i];
					if (_.isEqual(possibleMovePosition, {x: col, y: row}))
					{
						found = true;
						break;
					}
				}

				if (found)
				{
					cellGraphics.beginFill(0xFFFF00);				
				}
				else
				{
					cellGraphics.beginFill(0x00FF00);
				}
			}
			else
			{
				let model = cellContent.models[0];
				if (model.deploymentCard.affiliation === DeploymentCardsTypeUtilClass.getAffiliations().EMPIRE)
				{
					cellGraphics.beginFill(0x666666);
				}
				else if (model.deploymentCard.affiliation === DeploymentCardsTypeUtilClass.getAffiliations().REBEL)
				{
					cellGraphics.beginFill(0x0000AA);
				}
			}
		}

		else if (cellContent.type === cellContentTypes.BLOCKED)
		{
			cellGraphics.beginFill(0xFF0000);
		}
		else
			console.log("LevelView.ctor: unknown cellContent :" + cellContent);

		let cellSize = this.model.cellLength;
		cellGraphics.drawRect(row * cellSize, col * cellSize, cellSize, cellSize);
	}
};

LevelView.prototype.setTilesToSelect = function(positions, callback, context)
{
	let x = 0;
    let y = 0;
    let index = 0;
    this.selectablePositions = positions;

    for (let i = 0; i < this.selectablePositions.length; ++i)
    {
        x = this.selectablePositions[i].x;
        y = this.selectablePositions[i].y;
        index = LevelModelUtilClass.XYToIndex(this.model.getGridLength(), x, y);
    	this.levelGraphics[index].interactive = true;
    	this.levelGraphics[index].buttonMode = true;
    	this.levelGraphics[index].on("pointerup", callback.bind(context, x, y));
    }
};

LevelView.prototype.clearSelectableTiles = function(callback)
{
	let x = 0;
	let y = 0;
	let index = 0;

	for (let i = 0; i < this.selectablePositions.length; ++i)
	{
		x = this.selectablePositions[i].x;
		y = this.selectablePositions[i].y;
		index = LevelModelUtilClass.XYToIndex(this.model.getGridLength(), x, y);
		this.levelGraphics[index].interactive = false;
		this.levelGraphics[index].buttonMode = false;
		this.levelGraphics[index].off("pointerdown", undefined);
	}

	this.selectablePositions = [];
};


module.exports = LevelView;