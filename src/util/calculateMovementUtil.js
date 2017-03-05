module.exports = {
    calculateMovementLength: function(levelModel, model)
    {
        function isValidSpot(levelModel, position)
        {
            if (position.x >= 0 && position.x < levelModel.getGridLength() && 
                position.y >= 0 && position.y < levelModel.getGridLength())
            {
                let levelCell = levelModel.getGridContent(position.x, position.y);
                if (levelCell.type !== levelModel.getGridCellTypes().BLOCKED)
                    return true;
                else
                    return false;
            }
            else 
                return false;
        }

        function getAdjacentAreas(levelModel, position)
        {
            let topLeftPos = {x: position.x - 1, y: position.y - 1};
            let topPos = {x: position.x, y: position.y - 1};
            let topRightPos = { x: position.x + 1, y: position.y - 1};
            let leftPos = { x: position.x - 1, y: position.y};
            let rightPos = { x: position.x + 1, y: position.y};
            let bottomLeftPos = { x: position.x - 1, y: position.y + 1};
            let bottomPos = { x: position.x, y: position.y + 1};
            let bottomRightPos = { x: position.x + 1, y: position.y + 1};

            if (isValidSpot(levelModel, topLeftPos)) { adjacentAreas.push(topLeftPos); }
            if (isValidSpot(levelModel, topPos)) { adjacentAreas.push(topPos); }
            if (isValidSpot(levelModel, topRightPos)) { adjacentAreas.push(topRightPos); }
            if (isValidSpot(levelModel, leftPos)) { adjacentAreas.push(leftPos); }
            if (isValidSpot(levelModel, rightPos)) { adjacentAreas.push(rightPos); }
            if (isValidSpot(levelModel, bottomLeftPos)) { adjacentAreas.push(bottomLeftPos); }
            if (isValidSpot(levelModel, bottomPos)) { adjacentAreas.push(bottomPos); }
            if (isValidSpot(levelModel, bottomRightPos)) { adjacentAreas.push(bottomRightPos); }

            return adjacentAreas;
        }

        let speed = model.deploymentCard.currentSpeed;
        let position = model.position;
        let adjacentAreas = [];

        adjacentAreas =  getAdjacentAreas(levelModel, position);
        return adjacentAreas;
    }
};