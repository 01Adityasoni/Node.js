const fs = require('fs');


function loggerMiddleware(req, res, next) {
    const log = '[' + new Date().toISOString() + '] ' + req.method + ' ' + req.url + '\n';
    fs.appendFileSync('logs.txt', log);
    next();
}

module.exports = loggerMiddleware;
