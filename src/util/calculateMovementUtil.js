let DeploymentCardsTypesUtilClass = require("./deploymentCardsTypesUtil.js");
let LevelModelUtilClass = require("./levelModelUtil.js");

let _ = require('underscore');

function checkLevelBounds(position, levelModel)
{
    return position.x >= 0 && position.x < levelModel.getGridLength() && 
    position.y >= 0 && position.y < levelModel.getGridLength(); 
}

function isValidSpot(levelModel, model, moveCount, maxMoveCount, position)
{
    if (checkLevelBounds(position, levelModel))
    {
        let levelCell = levelModel.getGridContent(position.x, position.y);
        if (levelCell.type === levelModel.getGridCellTypes().EMPTY)
        {
            // is the cell empty of a model?
            if (levelCell.models.length === 0)
                return true;
            else
            {
                // is the model in the cell not of the same army as the
                // model moving
                let cellModel = levelCell.models[0];
                if (cellModel.deploymentCard !== model)
                {
                    let movesLeft = maxMoveCount - moveCount;
                    let validMoveCount = model.affiliation === cellModel.affiliation ? 2 : 3;
                    if (movesLeft >= validMoveCount)
                        return true;
                }
            }
        }
    }

    return false;
}

function getSurroundingArea(position, levelModel)
{
    let adjacentAreas = [];
    let topLeftPos = {x: position.x - 1, y: position.y - 1};
    let topPos = {x: position.x, y: position.y - 1};
    let topRightPos = { x: position.x + 1, y: position.y - 1};
    let leftPos = { x: position.x - 1, y: position.y};
    let rightPos = { x: position.x + 1, y: position.y};
    let bottomLeftPos = { x: position.x - 1, y: position.y + 1};
    let bottomPos = { x: position.x, y: position.y + 1};
    let bottomRightPos = { x: position.x + 1, y: position.y + 1};

    if (checkLevelBounds(topLeftPos, levelModel)) { adjacentAreas.push(topLeftPos); }
    if (checkLevelBounds(topPos, levelModel)) { adjacentAreas.push(topPos); }
    if (checkLevelBounds(topRightPos, levelModel)) { adjacentAreas.push(topRightPos); }
    if (checkLevelBounds(leftPos, levelModel)) { adjacentAreas.push(leftPos); }
    if (checkLevelBounds(rightPos, levelModel)) { adjacentAreas.push(rightPos); }
    if (checkLevelBounds(bottomLeftPos, levelModel)) { adjacentAreas.push(bottomLeftPos); }
    if (checkLevelBounds(bottomPos, levelModel)) { adjacentAreas.push(bottomPos); }
    if (checkLevelBounds(bottomRightPos, levelModel)) { adjacentAreas.push(bottomRightPos); }
    return adjacentAreas;
}

function getAdjacentWalkableAreas(levelModel, model, moveCount, maxMoveCount,position)
{
    if (moveCount >= maxMoveCount)
        return [];

    let topLeftPos = {x: position.x - 1, y: position.y - 1};
    let topPos = {x: position.x, y: position.y - 1};
    let topRightPos = { x: position.x + 1, y: position.y - 1};
    let leftPos = { x: position.x - 1, y: position.y};
    let rightPos = { x: position.x + 1, y: position.y};
    let bottomLeftPos = { x: position.x - 1, y: position.y + 1};
    let bottomPos = { x: position.x, y: position.y + 1};
    let bottomRightPos = { x: position.x + 1, y: position.y + 1};

    let newMoveCount = moveCount + 1;
    let adjacentAreas = [];
    if (isValidSpot(levelModel, model, moveCount, maxMoveCount, topLeftPos)) { adjacentAreas.push({ position: topLeftPos, moveCount: newMoveCount}); }
    if (isValidSpot(levelModel, model, moveCount, maxMoveCount, topPos)) { adjacentAreas.push({ position: topPos, moveCount: newMoveCount}); }
    if (isValidSpot(levelModel, model, moveCount, maxMoveCount, topRightPos)) { adjacentAreas.push({ position: topRightPos, moveCount: newMoveCount}); }
    if (isValidSpot(levelModel, model, moveCount, maxMoveCount, leftPos)) { adjacentAreas.push({ position: leftPos, moveCount: newMoveCount}); }
    if (isValidSpot(levelModel, model, moveCount, maxMoveCount, rightPos)) { adjacentAreas.push({ position: rightPos, moveCount: newMoveCount}); }
    if (isValidSpot(levelModel, model, moveCount, maxMoveCount, bottomLeftPos)) { adjacentAreas.push({ position: bottomLeftPos, moveCount: newMoveCount}); }
    if (isValidSpot(levelModel, model, moveCount, maxMoveCount, bottomPos)) { adjacentAreas.push({ position: bottomPos, moveCount: newMoveCount}); }
    if (isValidSpot(levelModel, model, moveCount, maxMoveCount, bottomRightPos)) { adjacentAreas.push({ position: bottomRightPos, moveCount: newMoveCount}); }

    return adjacentAreas;
}

module.exports = {
    getShortestPath: function(levelModel, from, to)
    {
        // A* Star algorithm
        
        function heuristicScore(current, to)
        {
            let yDiff = to.y - current.y;
            let xDiff = to.x - current.x;
            if (Math.abs(xDiff) === Math.abs(yDiff))
                return Math.abs(xDiff);

            // this could be tweaked
            return yDiff + xDiff;
        }

        function isInClosedSet(node)
        { 
            return _.some(closedSet, function(closedSetNode){return _.isEqual(closedSetNode.node, node); });
        }

        function isInOpenSet(node)
        {
            return _.isEqual(node.node, this);
        }

        function createPath(node)
        {
            let pathSize = 0;
            let prevNode = node;
            let path = [prevNode.node];
            while(prevNode.cameFrom !== null && prevNode.cameFrom !== undefined)
            {
                prevNode = prevNode.cameFrom;
                ++pathSize;
                path.push(prevNode.node);
            }
            
            let test = {pathSize: pathSize, path: path.reverse()};
            return test;
        }

        let closedSet = [];
        let fromNode = {node: from, previousPathScore: 0, finalScore: Infinity};
        let openSet = [fromNode];

        while (openSet.length !== 0)
        {
            let currentNode = _.sortBy(openSet, function(node){ return node.finalScore; })[0];
            if (_.isEqual(currentNode.node,to))
            {
                return createPath(currentNode);
            }

            openSet = _.without(openSet, currentNode);
            closedSet.push(currentNode);
            let adjacentAreas = getSurroundingArea(currentNode.node, levelModel);
            adjacentAreas = _.reject(adjacentAreas, isInClosedSet, this);
            for (let i = 0; i < adjacentAreas.length; ++i)
            {
                let neighbour = adjacentAreas[i];

                let newPathScore = currentNode.previousPathScore + 1; // +1 is because all node are 1 'movement point' away
                let adjacentCellInOpenSet = _.find(openSet, isInOpenSet, neighbour);
                if (adjacentCellInOpenSet !== undefined)
                {
                    if (newPathScore < adjacentCellInOpenSet.previousPathScore)
                    {
                        // we got here quicker than last evaluation
                        adjacentCellInOpenSet.previousPathScore = newPathScore;
                    }
                }
                else
                {
                    let newNode = {node: neighbour, previousPathScore: newPathScore, finalScore: heuristicScore(neighbour, to), cameFrom: currentNode};
                    openSet.push(newNode);
                }      
            }
        }

        let area = getSurroundingArea(from, levelModel);
    },

    calculateMovementArea: function(levelModel, model)
    {
        function addNewCellsToOpenCells(openCells, adjacentCells, moveCount)
        {
            function filterFunction(cell)
            {
                return _.isEqual(cell.position, this.position);
            }

            for (let i = 0; i < adjacentCells.length; ++i)
            {
                let existingCell = _.find(openCells, filterFunction, adjacentCells[i]);
                if (existingCell === undefined)
                {
                    openCells.push(adjacentCells[i]);
                }
                else
                {
                    // check if I got here sooner than previously
                    // if so change moveCount
                    if (moveCount < existingCell.moveCount)
                    {
                        existingCell.moveCount = moveCount;
                    }
                }
            }
        }

        let speed = model.currentSpeed;
        let moveCount = 0;
        let position = model.position;
        let openCells = [];

        openCells = getAdjacentWalkableAreas(levelModel, model.deploymentCard,  moveCount, speed, position);

        // now go through the open cells and get adjacent areas again
        for (let i = 0; i < openCells.length; ++i)
        {
            let position = openCells[i].position;
            let currentMoveCount = openCells[i].moveCount;
            let adjacentCells = getAdjacentWalkableAreas(levelModel, model.deploymentCard, currentMoveCount, speed, position);
            addNewCellsToOpenCells(openCells, adjacentCells);
        }

        return openCells;
    }
};