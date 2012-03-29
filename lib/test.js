var vnc = require('./vnc');

console.log('redraw', vnc.redraw());
vnc.on('redraw', function () {
    console.log('redraw event', vnc.redraw());
});
