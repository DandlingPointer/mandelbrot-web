define(function () {
    return function (context, x, y, height, width) {
        var r = new Object();
        r.context = context;
        r.canvasData = context.getImageData(x, y, height, width);
        r.height = height;
        r.width = width;
        r.x = x;
        r.y = y;
        //thanks to http://stackoverflow.com/a/8290734
        r.drawPixel = function (x, y, r, g, b, a) {
            var index = (x + y * this.width) * 4;
            this.canvasData.data[index + 0] = r;
            this.canvasData.data[index + 1] = g;
            this.canvasData.data[index + 2] = b;
            this.canvasData.data[index + 3] = a;
        };
        r.commit = function () {
            this.context.putImageData(this.canvasData, this.x, this.y);
        }
        return r;
    }
});
