module.exports = require('./module').pollCommand({
    cmd: 'netstat -nt | grep ":5900 *EST" | wc -l',
    rate: 5000,
    state: false,
    update: function (error, stdin, stderr) {
        return Number(stdin);
    },
    redraw: function (viewers) {
        if (viewers === false) {
            return '';
        }

        return '^fg(red)VNC ' + viewers + '^fg(white)';
    }
});
