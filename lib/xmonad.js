module.exports = require('./module').lineStream({
    update: function (line) {
        var match = line.match(/([^:]+)/);
        var ret;
        try {
            ret = [{
                windows: match
            }];
        } catch (e) {
            ret = [e];
        }
        return [line];
        return ret;
    },
    redraw: function (state) {
        return (state || ['Loading...']).join(',');
    }
});
