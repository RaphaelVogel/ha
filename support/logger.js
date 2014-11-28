var winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({ filename: '../support/default.log', level: 'warn', maxsize: 1048576, maxFiles: 2 })
    ]
});

module.exports = logger;