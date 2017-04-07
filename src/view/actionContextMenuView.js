function clear()
{
    this._container.removeChildren();
}

function ActionContextMenuView(stage, displayPosition)
{
    this._stage = stage;
    this._displayPosition = displayPosition;
    this._container = new PIXI.Container();
    this._stage = stage;
    this._stage.addChild(this._container);
}

ActionContextMenuView.prototype.displayMenu = function(actions) 
{
    clear.call(this);
    let buttonHeight = 25;
    let buttonYPos = 0;  
    this._container.x = this._displayPosition.x;
    this._container.y = this._displayPosition.y;

    if (actions.canMove)
    {
        let moveButton = new PIXI.Text("Move");
        moveButton.interactive = true;
        moveButton.buttonMode = true;
        moveButton.on("pointerup", function(){});
        moveButton.x = 0;
        moveButton.y = 0;
        buttonYPos += buttonHeight;
        this._container.addChild(moveButton);
    }
    
    if (actions.canRange || actions.canMelee)
    {
        let attackButton = new PIXI.Text("Attack");
        attackButton.interactive = true;
        attackButton.buttonMode = true;
        attackButton.on("pointerup", function(){});
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
        interactButton.on("pointerup", function(){});
        interactButton.x = 0;
        interactButton.y = buttonYPos;
        buttonYPos += buttonHeight;
        this._container.addChild(interactButton);        
    }
};

module.exports = ActionContextMenuView;