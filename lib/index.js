var spawn = require('child_process').spawn;

var dzen = spawn('/usr/local/bin/dzen2', ['-fn', 'Ubuntu Mono-11']);

function combine() {
    var list = Array.prototype.slice.call(arguments, 0);

    /**
     * Setup redrawing function
     */
    function redraw() {
        dzen.stdin.write(list.reduce(function (prev, obj) {
            if (typeof obj === 'string') {
                return prev + obj;
            } else if (typeof obj === 'undefined' || typeof obj.redraw === 'undefined') {
                return prev + 'ERROR';
            }
            return prev + obj.redraw();
        }, '') + '\n');
    }
    redraw();

    /**
     * Listen on modules' redraw events
     */
    list.forEach(function (obj) {
        if (typeof obj !== 'string') {
            obj.on('redraw', redraw);
        }
    });
}

combine(
    //require('./xmonad'),
    ' -- ',
    require('./vnc')
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
