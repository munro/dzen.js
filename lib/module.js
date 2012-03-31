var EventEmitter = require('events').EventEmitter,
    exec = require('child_process').exec;

exports.lineStream = function (opts) {
    var module = new EventEmitter(),
        input = opts.stdin || process.stdin,
        buffer = '';

    module.state = opts.state;

    /**
     * Setup update function
     */
    input.on('data', function (data) {
        buffer += data;

        var split = buffer.split(/\r?\n\r?/);
        buffer = split.pop();

        if (split.length > 0) {
            module.state = opts.update.call(module, split.pop());
            module.emit('redraw');
        }
    });

    /**
     * Setup redraw function
     */
    module.redraw = function () {
        return opts.redraw.call(module, module.state);
    };

    /**
     * Start listening on input and return module
     */
    input.resume();
    input.setEncoding('utf-8');
    return module
};

exports.pollCommand = function (opts) {
    var module = new EventEmitter();

    module.state = opts.state;

    /**
     * Setup redraw function
     */
    module.redraw = function () {
        return opts.redraw.call(module, module.state);
    };

    /**
     * Setup command polling
     * TODO: prevent starting a new poll while one is in progress
     */
    function poll() {
        exec(opts.cmd, function () {
            module.state = opts.update.apply(module, arguments);
            module.emit('redraw');
        });
    }
    poll();
    setInterval(poll, opts.rate);

    return module;
};
