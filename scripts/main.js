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
        colorMod;
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
        modR: 30,
        modG: 30,
        modB: 30
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

    draw = function (renderer, minX, maxX, minY, maxY, iterations, colorMod) {
        var x, y, coordX, coordY, c, z, color;
        for (x = renderer.x; x <= renderer.width; x = x + 1) {
            for (y = renderer.y; y <= renderer.height; y = y + 1) {
                coordX = helpers.mapVal(x, renderer.x, renderer.width, minX, maxX);
                coordY = helpers.mapVal(y, renderer.y, renderer.height, minY, maxY);
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
        draw(r,
            Number(document.getElementById("min-x").value),
            Number(document.getElementById("max-x").value),
            Number(document.getElementById("min-y").value),
            Number(document.getElementById("max-y").value),
            Number(document.getElementById("iterations").value), {
                r: Number(document.getElementById("mod-r").value),
                g: Number(document.getElementById("mod-g").value),
                b: Number(document.getElementById("mod-b").value)
            });
    };
    update();
    document.getElementById("draw-button").onclick = update;
});
