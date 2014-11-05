require(["render", "helpers"], function (render, helpers) {
    "use strict";
    var canvas = document.getElementById("draw-area"),
        ctx,
        r,
        draw,
        checkPosition,
        update,
        addWarning,
        removeWarning,
        addError,
        removeError,
        reset,
        validateFunctionFactory,
        errorFlag, updateProgressBar,
        removeProgressBar;

    updateProgressBar = function (val, max) {
        document.getElementById("progress-bar").setAttribute("value", val);
        document.getElementById("progress-bar").setAttribute("max", max);
    };

    removeProgressBar = function (val, max) {
        document.getElementById("progress-bar").removeAttribute("value");
        document.getElementById("progress-bar").removeAttribute("max");
    };

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

        widthNode = document.getElementById("width");
        widthNode.value = 500;
        removeError(widthNode);
        removeWarning(widthNode);
        heightNode = document.getElementById("height");
        heightNode.value = 500;
        removeError(heightNode);
        removeWarning(heightNode);
        minXNode = document.getElementById("min-x");
        minXNode.value = -2.0;
        removeError(minXNode);
        removeWarning(minXNode);
        maxXNode = document.getElementById("max-x");
        maxXNode.value = 2.0;
        removeError(maxXNode);
        removeWarning(maxXNode);
        minYNode = document.getElementById("min-y");
        minYNode.value = -2.0;
        removeError(minYNode);
        removeWarning(minYNode);
        maxYNode = document.getElementById("max-y");
        maxYNode.value = 2.0;
        removeError(maxYNode);
        removeWarning(maxYNode);
        iterationsNode = document.getElementById("iterations");
        iterationsNode.value = 30;
        removeError(iterationsNode);
        removeWarning(iterationsNode);
        modRNode = document.getElementById("mod-r");
        modRNode.value = 30;
        removeError(modRNode);
        removeWarning(modRNode);
        modGNode = document.getElementById("mod-g");
        modGNode.value = 30;
        removeError(modGNode);
        removeWarning(modGNode);
        modBNode = document.getElementById("mod-b");
        modBNode.value = 30;
        removeError(modBNode);
        removeWarning(modBNode);
        errorFlag = false;

    };

    update = function () {
        var i, errElems, canvas, ctx, r, el, newEl;
        if (errorFlag === true) {
            /*
            errElems = document.getElementsByClassName("error-sign");
            for (i = 0; i < errElems.length; i = i + 1) {
                el = errElems.item(i);
                newEl = el.cloneNode(true);
                el.parentNode.replaceChild(newEl, el);
                el.classList.add("blink");
            }
            */
            return;
        }
        canvas = document.getElementById("draw-area");
        canvas.width = Number(document.getElementById("width").value);
        canvas.height = Number(document.getElementById("height").value);
        ctx = canvas.getContext("2d");
        r = render(ctx, 0, 0, canvas.height, canvas.width);
        draw(r, {
            minX: Number(document.getElementById("min-x").value),
            maxX: Number(document.getElementById("max-x").value),
            minY: Number(document.getElementById("min-y").value),
            maxY: Number(document.getElementById("max-y").value)
        }, Number(document.getElementById("iterations").value), {
            r: Number(document.getElementById("mod-r").value),
            g: Number(document.getElementById("mod-g").value),
            b: Number(document.getElementById("mod-b").value)
        });
    };

    addError = function (node) {
        node.previousElementSibling.classList.add("fa");
        node.previousElementSibling.classList.add("fa-times-circle");
        node.previousElementSibling.classList.add("error-sign");
        node.classList.add("error");
        errorFlag = true;
    };
    removeError = function (node) {
        node.previousElementSibling.classList.remove("fa");
        node.previousElementSibling.classList.remove("fa-times-circle");
        node.previousElementSibling.classList.remove("error-sign");
        node.classList.remove("error");
        errorFlag = false;
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

    validateFunctionFactory = function (minVal, maxVal) {
        return function () {
            var val = this.value;
            removeWarning(this);
            removeError(this);
            if (isNaN(Number(val))) {
                addError(this);
                return;
            }
            if (!isNaN(minVal) && !isNaN(maxVal)) {
                if (val > maxVal || val < minVal) {
                    addWarning(this);
                } else {
                    removeWarning(this);
                }
            }
        };
    };
    reset();
    document.getElementById("draw-button").onclick = update;
    document.getElementById("reset").onclick = reset;
    document.getElementById("width").onkeyup = validateFunctionFactory(200, 3000);
    document.getElementById("height").onkeyup = validateFunctionFactory(200, 3000);
    document.getElementById("min-x").onkeyup = validateFunctionFactory(NaN, NaN);
    document.getElementById("max-x").onkeyup = validateFunctionFactory(NaN, NaN);
    document.getElementById("min-y").onkeyup = validateFunctionFactory(NaN, NaN);
    document.getElementById("max-y").onkeyup = validateFunctionFactory(NaN, NaN);
    document.getElementById("iterations").onkeyup = validateFunctionFactory(0, 30);
    document.getElementById("mod-r").onkeyup = validateFunctionFactory(NaN, NaN);
    document.getElementById("mod-g").onkeyup = validateFunctionFactory(NaN, NaN);
    document.getElementById("mod-b").onkeyup = validateFunctionFactory(NaN, NaN);
    update();
});
