function SurgeContextMenuView(stage, displayPosition)
{
    this._stage = stage;
    this._displayPosition = displayPosition;
    this._container = new PIXI.Container();
    this._stage = stage;
    this._stage.addChild(this._container);
}

SurgeContextMenuView.prototype.displayMenu = function(surgeAbilities, callbackContext, callback) 
{
    this.clear();
    let buttonHeight = 25;
    let buttonYPos = 0;  
    this._container.x = this._displayPosition.x;
    this._container.y = this._displayPosition.y;

    for (let i = 0; i < surgeAbilities.length; ++i)
    {
        let surgeButton = new PIXI.Text("SURGE!!");
        for (let keyValuePair in surgeAbilities[i])
            surgeButton.text = keyValuePair + " " + surgeAbilities[i][keyValuePair];

        surgeButton.interactive = true;
        surgeButton.buttonMode = true;
        surgeButton.on("pointerup", callback.bind(callbackContext, surgeAbilities[i]));
        surgeButton.x = 0;
        surgeButton.y = buttonYPos;
        buttonYPos += buttonHeight;
        this._container.addChild(surgeButton);
    }
};

SurgeContextMenuView.prototype.clear = function()
{
    this._container.removeChildren();
};

module.exports = SurgeContextMenuView;