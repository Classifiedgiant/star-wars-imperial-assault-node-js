module.exports = {
    indexToXY: function(gridLength, index)
    {
        return {x: index % gridLength, y: Math.floor(index / gridLength)};
    },

    XYToIndex: function(gridLength, x, y)
    {
        return y * gridLength + x;
    }
};