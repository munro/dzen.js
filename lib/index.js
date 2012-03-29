function combine() {
    var list = Array.prototype.slice.apply(arguments, 0);

    /**
     * Setup redrawing function
     */
    function redraw() {
        process.stdout.write(list.reduce(function (prev, obj) {
            if (typeof obj === 'undefined' || typeof obj.redraw === 'undefined') {
                return prev + 'ERROR';
            } else if (typeof obj === 'string') {
                return prev + obj;
            }
            return prev + obj.redraw();
        }, ''));
    }
    redraw();

    /**
     * Listen on modules' redraw events
     */
    list.forEach(function () {
        if (typeof obj !== 'string') {
            obj.on('redraw', redraw);
        }
    });
}

combine(
    require('./xmonad'),
    ' -- '
    require('./vnc'),
);

/*
dzen({
    listen: [xmonad, vnc],
    redraw: function (ctx) {
        return ctx
            .module(xmonad)
            .write('hello')
            .module(vnc);
    }
});
*/
