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
        removeError;
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

    document.getElementById("draw-button").onclick = update;
    document.getElementById("width").onkeyup = function () {
        var val = this.value;
        removeWarning(this);
        removeError(this);
        if (isNaN(Number(val))) {
            addError(this);
            return;
        }
        if (val > 3000 || val < 200) {
            addWarning(this);
        } else {
            removeWarning(this);
        }
        width = val;
    };
    document.getElementById("height").onkeyup = function () {
        var val = this.value;
        removeWarning(this);
        removeError(this);
        if (Number.isNaN(Number(val))) {
            addError(this);
            return;
        }
        if (val > 3000 || val < 200) {
            addWarning(this);
        } else {
            removeWarning(this);
        }
        height = val;
    };
    document.getElementById("min-x").onkeyup = function () {
        var val = this.value;
        removeWarning(this);
        removeError(this);
        if (Number.isNaN(Number(val))) {
            addError(this);
            return;
        }
        dimensions.minX = val;
    };
    document.getElementById("max-x").onkeyup = function () {
        var val = this.value;
        removeWarning(this);
        removeError(this);
        if (Number.isNaN(Number(val))) {
            addError(this);
            return;
        }
        dimensions.maxX = val;

    };
    document.getElementById("min-y").onkeyup = function () {
        var val = this.value;
        removeWarning(this);
        removeError(this);
        if (Number.isNaN(Number(val))) {
            addError(this);
            return;
        }
        dimensions.minY = val;
    };
    document.getElementById("max-y").onkeyup = function () {
        var val = this.value;
        removeWarning(this);
        removeError(this);
        if (Number.isNaN(Number(val))) {
            addError(this);
            return;
        }
        dimensions.maxY = val;
    };
    document.getElementById("iterations").onkeyup = function () {
        var val = this.value;
        removeWarning(this);
        removeError(this);
        if (Number.isNaN(Number(val))) {
            addError(this);
            return;
        }
        if (val > 100) {
            addWarning(this);
        } else {
            removeWarning(this);
        }
        iterations = val;
    };
    document.getElementById("mod-r").onkeyup = function () {
        var val = this.value;
        removeWarning(this);
        removeError(this);
        if (Number.isNaN(Number(val))) {
            addError(this);
            return;
        }
        colorMod.r = val;
    };
    document.getElementById("mod-g").onkeyup = function () {
        var val = this.value;
        removeWarning(this);
        removeError(this);
        if (Number.isNaN(Number(val))) {
            addError(this);
            return;
        }
        colorMod.g = val;
    };
    document.getElementById("mod-b").onkeyup = function () {
        var val = this.value;
        removeWarning(this);
        removeError(this);
        if (Number.isNaN(Number(val))) {
            addError(this);
            return;
        }
        colorMod.b = val;
    };
    update();
});
