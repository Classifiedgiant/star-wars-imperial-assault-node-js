let PIXI = require ("../external/pixi.min.js");
let AppClass = require ("./app.js");
let renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.view);
let stage = new PIXI.Container();

let updateTick = 30;

let app = null;
//let levelView = null;

function initFunc()
{
    app = new AppClass();
    app.setupGame();
	//levelModel = new LevelModelClass();
	//levelView = new LevelViewClass(levelModel, stage);
}

function updateFunc()
{
	
	renderer.render(stage);
}

initFunc();
setTimeout(updateFunc, 30);