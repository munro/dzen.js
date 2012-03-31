function parseConfig(data) {
    var obj = {};
    data.split(/\r?\n\r?/).map(function (line) {
        return line.match(/\s*([^:]+):\s*(.*$)/);
    }).filter(function (match) {
        return match !== null;
    }).forEach(function (match) {
        obj[match[1]] = match[2];
    });
    return obj;
}

module.exports = require('./module').pollCommand({
    cmd: 'cat /proc/acpi/battery/BAT1/info /proc/acpi/battery/BAT1/state',
    rate: 5000,
    state: false,
    update: function (error, stdin, stderr) {
        var config = parseConfig(stdin);
        return parseInt(config['remaining capacity'])
            / parseInt(config['last full capacity']);
    },
    redraw: function (capacity) {
        if (capacity === false) {
            return '';
        }

        return '^fg(red)battery ' + Math.round(capacity * 100) + '%^fg(white)';
    }
});
