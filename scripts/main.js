require(["complex", "render"], function (complex, render) {
    var canvas = document.getElementById("draw-area");
    var ctx = canvas.getContext("2d");
    r = render(ctx, 0, 0, canvas.height, canvas.width);
    r.drawPixel(50, 50, 0, 0, 0, 255);
    r.commit();
});
