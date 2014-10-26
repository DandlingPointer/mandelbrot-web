require(["complex", "render", "helpers"], function (complex, render, helpers) {
    "use strict";
    var canvas = document.getElementById("draw-area"),
        ctx = canvas.getContext("2d"),
        r = render(ctx, 0, 0, canvas.height, canvas.width),
        draw,
        checkPosition;
    console.log(r.x, r.y, r.height, r.width);
    checkPosition = function (z, c, iterations) {
        var i,
            color = {
                r: 255,
                g: 255,
                b: 255,
                a: 255
            };
        for (i = 0; i < iterations; i = i + 1) {
            //z^2
            z.r = z.r * z.r - z.i * z.i;
            z.i = z.r * z.i + z.i * z.r;
            //z+c (z ist jetzt result von z^2)
            z.r = z.r + c.r;
            z.i = z.i + c.i;
            if (Math.sqrt(z.r * z.r + z.i * z.i) >= 2) {
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
                coordX = helpers.mapVal(x, r.x, r.width, minX, maxX);
                coordY = helpers.mapVal(y, r.y, r.height, minY, maxY);
                z = {
                    r: 0,
                    i: 0
                };
                c = {
                    r: coordX,
                    i: coordY
                };
                color = checkPosition(z, c, iterations);
                r.drawPixel(x, y, color.r, color.g, color.b, color.a);
            }
        }
        r.commit();
    };

    draw(-2.0, 2.0, -2.0, 2.0, 30);
});
