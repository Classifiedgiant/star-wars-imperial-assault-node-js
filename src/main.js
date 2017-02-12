let PIXI = require ("../external/pixi.min.js");
let LevelModelClass = require("./model/levelModel.js");
let LevelViewClass = require("./view/levelView.js");

let renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.view);
let stage = new PIXI.Container();

let updateTick = 30;

let levelModel = null;
let levelView = null;

function initFunc()
{
	levelModel = new LevelModelClass();
	levelView = new LevelViewClass(levelModel, stage);
}

function updateFunc()
{
	
	renderer.render(stage);
}

initFunc();
setTimeout(updateFunc, 30);


//renderer.render(stage);