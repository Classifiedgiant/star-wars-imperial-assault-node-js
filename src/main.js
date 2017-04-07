let PIXI = require ("../external/pixi.min.js");
let AppClass = require ("./app.js");
let renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
renderer.backgroundColor = 0xaaaaaa;
document.body.appendChild(renderer.view);
let stage = new PIXI.Container();

let updateTick = 30;

let app = null;

function initFunc()
{
    app = new AppClass(stage);
    app.setupGame();
}

function updateFunc()
{
    app.update();
	app.render();
	renderer.render(stage);
}

initFunc();
setInterval(updateFunc, 30);