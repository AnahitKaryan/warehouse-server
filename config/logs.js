const bunyan = require('bunyan');

const log = bunyan.createLogger({
    name: 'myapp',
    streams: [
        {
            stream: process.stdout,
            level: 'info'
        },
        {
            stream: process.stdout,
            level: 'warn'
        }
    ]
});

module.exports = log;
