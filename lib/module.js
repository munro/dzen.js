var EventEmitter = require('events').EventEmitter,
    exec = require('child_process').exec;

exports.lineStream = function (opts) {
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
