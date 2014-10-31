require(["render", "helpers"], function (render, helpers) {
    "use strict";
    var canvas = document.getElementById("draw-area"),
        ctx,
        r,
        draw,
        checkPosition,
        update,
        width,
        height,
        dimensions,
        iterations,
        colorMod,
        addWarning,
        removeWarning,
        addError,
        removeError,
        reset,
        validateFunctionFactory;

    checkPosition = function (z, c, iterations, mod) {
        var i, temp, res,
            color = {
                r: 255,
                g: 255,
                b: 255,
                a: 255
            };
        for (i = 0; i < iterations; i = i + 1) {
            //z^2
            temp = z.r;
            z.r = z.r * z.r - z.i * z.i;
            z.i = temp * z.i + z.i * temp;
            //z+c (z ist jetzt result von z^2)
            z.r = z.r + c.r;
            z.i = z.i + c.i;
            if (Math.sqrt(z.r * z.r + z.i * z.i) >= 2) {
                color.r = mod.r * i;
                color.g = mod.g * i;
                color.b = mod.b * i;
                return color;
            }
        }
        color.r = 0;
        color.g = 0;
        color.b = 0;
        color.a = 255;
        return color;
    };

    draw = function (renderer, dim, iterations, colorMod) {
        var x, y, coordX, coordY, c, z, color;
        for (x = renderer.x; x <= renderer.width; x = x + 1) {
            for (y = renderer.y; y <= renderer.height; y = y + 1) {
                coordX = helpers.mapVal(x, renderer.x, renderer.width, dim.minX, dim.maxX);
                coordY = helpers.mapVal(y, renderer.y, renderer.height, dim.minY, dim.maxY);
                z = {
                    r: 0.0,
                    i: 0.0
                };
                c = {
                    r: coordX,
                    i: coordY
                };
                color = checkPosition(z, c, iterations, colorMod);
                renderer.drawPixel(x, y, color.r, color.g, color.b, color.a);
            }
        }
        renderer.commit();
    };

    reset = function () {
        var widthNode, heightNode, minXNode, maxXNode,
            minYNode, maxYNode, iterationsNode,
            modRNode, modGNode, modBNode;

        width = 500;
        height = 500;
        dimensions = {
            minX: -2.0,
            maxX: 2.0,
            minY: -2.0,
            maxY: 2.0
        };
        iterations = 30;
        colorMod = {
            r: 30,
            g: 30,
            b: 30
        };
        widthNode = document.getElementById("width");
        widthNode.value = width;
        removeError(widthNode);
        removeWarning(widthNode);
        heightNode = document.getElementById("height");
        heightNode.value = height;
        removeError(heightNode);
        removeWarning(heightNode);
        minXNode = document.getElementById("min-x");
        minXNode.value = dimensions.minX;
        removeError(minXNode);
        removeWarning(minXNode);
        maxXNode = document.getElementById("max-x");
        maxXNode.value = dimensions.maxX;
        removeError(maxXNode);
        removeWarning(maxXNode);
        minYNode = document.getElementById("min-y");
        minYNode.value = dimensions.minY;
        removeError(minYNode);
        removeWarning(minYNode);
        maxYNode = document.getElementById("max-y");
        maxYNode.value = dimensions.maxY;
        removeError(maxYNode);
        removeWarning(maxYNode);
        iterationsNode = document.getElementById("iterations");
        iterationsNode.value = iterations;
        removeError(iterationsNode);
        removeWarning(iterationsNode);
        modRNode = document.getElementById("mod-r");
        modRNode.value = colorMod.r;
        removeError(modRNode);
        removeWarning(modRNode);
        modGNode = document.getElementById("mod-g");
        modGNode.value = colorMod.g;
        removeError(modGNode);
        removeWarning(modGNode);
        modBNode = document.getElementById("mod-b");
        modBNode.value = colorMod.b;
        removeError(modBNode);
        removeWarning(modBNode);
    };

    update = function () {
        var canvas, ctx, r;
        canvas = document.getElementById("draw-area");
        canvas.width = Number(document.getElementById("width").value);
        canvas.height = Number(document.getElementById("height").value);
        ctx = canvas.getContext("2d");
        r = render(ctx, 0, 0, canvas.height, canvas.width);
        draw(r, dimensions, iterations, colorMod);
    };

    addError = function (node) {
        node.previousElementSibling.classList.add("fa");
        node.previousElementSibling.classList.add("fa-times-circle");
        node.previousElementSibling.classList.add("error-sign");
        node.classList.add("error");
    };
    removeError = function (node) {
        node.previousElementSibling.classList.remove("fa");
        node.previousElementSibling.classList.remove("fa-times-circle");
        node.previousElementSibling.classList.remove("error-sign");
        node.classList.remove("error");
    };

    addWarning = function (node) {
        node.previousElementSibling.classList.add("fa");
        node.previousElementSibling.classList.add("fa-warning");
        node.previousElementSibling.classList.add("warning-sign");
        node.classList.add("warning");
    };

    removeWarning = function (node) {
        node.previousElementSibling.classList.remove("fa");
        node.previousElementSibling.classList.remove("fa-warning");
        node.previousElementSibling.classList.remove("warning-sign");
        node.classList.remove("warning");
    };

    validateFunctionFactory = function (property, minVal, maxVal) {
        return function () {
            var val = this.value;
            removeWarning(this);
            removeError(this);
            if (isNaN(Number(val))) {
                addError(this);
                return;
            }
            if (!Number.isNaN(minVal) && !Number.isNaN(maxVal)) {
                if (val > maxVal || val < minVal) {
                    addWarning(this);
                } else {
                    removeWarning(this);
                }
            }
            property = val;
        };
    };
    reset();
    document.getElementById("draw-button").onclick = update;
    document.getElementById("reset").onclick = reset;
    document.getElementById("width").onkeyup = validateFunctionFactory(width, 200, 3000);
    document.getElementById("height").onkeyup = validateFunctionFactory(height, 200, 3000);
    document.getElementById("min-x").onkeyup = validateFunctionFactory(dimensions.minX, NaN, NaN);
    document.getElementById("max-x").onkeyup = validateFunctionFactory(dimensions.maxX, NaN, NaN);
    document.getElementById("min-y").onkeyup = validateFunctionFactory(dimensions.minY, NaN, NaN);
    document.getElementById("max-y").onkeyup = validateFunctionFactory(dimensions.maxY, NaN, NaN);
    document.getElementById("iterations").onkeyup = validateFunctionFactory(iterations, 0, 30);
    document.getElementById("mod-r").onkeyup = validateFunctionFactory(colorMod.r, NaN, NaN);
    document.getElementById("mod-g").onkeyup = validateFunctionFactory(colorMod.g, NaN, NaN);
    document.getElementById("mod-b").onkeyup = validateFunctionFactory(colorMod.b, NaN, NaN);
    update();
});
