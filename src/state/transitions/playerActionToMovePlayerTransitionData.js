function PlayerActionToMovePlayerTransitionData(movingModel, selectedPosition, moveCount)
{
    this.movingModel = movingModel;
    this.selectedPosition = selectedPosition;
    this.moveCount = moveCount; 
}

module.exports = PlayerActionToMovePlayerTransitionData;