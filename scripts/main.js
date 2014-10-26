require(["complex", "render", "helpers"], function (complex, render, helpers) {
    "use strict";
    var canvas = document.getElementById("draw-area"),
        ctx = canvas.getContext("2d"),
        r = render(ctx, 0, 0, canvas.height, canvas.width),
        draw,
        checkPosition;
    checkPosition = function (z, c, iterations) {
        var i,
            color = {
                r: 255,
                g: 255,
                b: 255,
                a: 255
            };
        for (i = 0; i < iterations; i = i + 1) {
            z = z.pow(2).add(c);
            if (z.absolute() >= 2) {
                return color;
            }
        }
        color.r = 0;
        color.g = 0;
        color.b = 0;
        color.a = 255;
        return color;
    };

    draw = function (minX, maxX, minY, maxY, iterations) {
        var x, y, coordX, coordY, c, z, color;
        for (x = r.x; x <= r.width; x = x + 1) {
            for (y = r.y; y <= r.height; y = y + 1) {
                coordX = helpers.mapVal(x, r.x, r.height, minX, maxX);
                coordY = helpers.mapVal(y, r.y, r.height, minY, maxY);
                z = Object.create(complex);
                z.r = 0;
                z.i = 0;
                c = Object.create(complex);
                c.r = coordX;
                c.i = coordY;
                color = checkPosition(z, c, iterations);
                r.drawPixel(x, y, color.r, color.g, color.b, color.a);
            }
        }
        r.commit();
    };

    draw(-2.0, 2.0, -2.0, 2.0, 30);
});
