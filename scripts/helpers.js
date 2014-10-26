define({
    mapVal: function (val, minA, maxA, minB, maxB) {
        return (val - minA) / (maxA - minA) * (maxB - minB) + minB;
    }
});
