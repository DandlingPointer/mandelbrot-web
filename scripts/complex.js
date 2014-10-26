define({
    r: 0,
    i: 0,
    absolute: function () {
        return Math.sqrt(this.r * this.r + this.y * this.y);
    },
    add: function (c2) {
        var res = Object.create(this);
        res.r = this.r + c2.r;
        res.i = this.i + c2.i;
        return res;
    },
    subtract: function (c2) {
        var res = Object.create(this);
        res.r = this.r - c2.r;
        res.i = this.i - c2.i;
        return res;
    },
    multiply: function (c2) {
        var res = Object.create(this);
        res.r = this.r * c2.r - this.i * c2.i;
        res.i = this.r * c2.i + this.i * c2.r;
        return res;
    },
    pow: function (exp) {
        var i;
        if (exp === 0) {
            return 1;
        }
        var res = Object.create(this);
        for (i = 2; i <= exp; i = i + 1) {
            res = res.multiply(res);
        }
        return res;
    },
    divide: function (c2) {
        var res = Object.create(this);
        res.r = (this.r * c2.r + this.i * c2.i) /
            (c2.r * c2.r + c2.i * c2.i);
        res.i = (this.i * c2.r - this.r * c2.i) /
            (c2.r * c2.r + c2.i * c2.i);
    }
});
