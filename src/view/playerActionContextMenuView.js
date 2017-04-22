function PlayerActionContextMenuView(stage, displayPosition)
{
    this._stage = stage;
    this._displayPosition = displayPosition;
    this._container = new PIXI.Container();
    this._stage = stage;
    this._stage.addChild(this._container);
}

PlayerActionContextMenuView.prototype.displayMenu = function(actions, callbackContext, moveCallback, rangeCallback, meleeCallback, interactCallback) 
{
    this.clear();
    let buttonHeight = 25;
    let buttonYPos = 0;  
    this._container.x = this._displayPosition.x;
    this._container.y = this._displayPosition.y;

    if (actions.canMove)
    {
        let moveButton = new PIXI.Text("Move");
        moveButton.interactive = true;
        moveButton.buttonMode = true;
        moveButton.on("pointerup", moveCallback.bind(callbackContext));
        moveButton.x = 0;
        moveButton.y = buttonYPos;
        buttonYPos += buttonHeight;
        this._container.addChild(moveButton);
    }
    
    if (actions.canRange)
    {
        let attackButton = new PIXI.Text("Attack - Range");
        attackButton.interactive = true;
        attackButton.buttonMode = true;
        attackButton.on("pointerup", rangeCallback.bind(callbackContext));
        attackButton.x = 0;
        attackButton.y = buttonYPos;
        buttonYPos += buttonHeight;
        this._container.addChild(attackButton);        
    }

    if (actions.canMelee)
    {
        let attackButton = new PIXI.Text("Attack - Melee");
        attackButton.interactive = true;
        attackButton.buttonMode = true;
        attackButton.on("pointerup", meleeCallback.bind(callbackContext));
        attackButton.x = 0;
        attackButton.y = buttonYPos;
        buttonYPos += buttonHeight;
        this._container.addChild(attackButton);        
    }

    if (actions.canInteract)
    {
        let interactButton = new PIXI.Text("Interact");
        interactButton.interactive = true;
        interactButton.buttonMode = true;
        interactButton.on("pointerup", interactCallback.bind(callbackContext));
        interactButton.x = 0;
        interactButton.y = buttonYPos;
        buttonYPos += buttonHeight;
        this._container.addChild(interactButton);        
    }
};

PlayerActionContextMenuView.prototype.clear = function()
{
    this._container.removeChildren();
};

module.exports = PlayerActionContextMenuView;