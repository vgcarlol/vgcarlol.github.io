const fs = require('fs');
const path = require('path');

function logRequests(req, res, next) {
    const { method, url } = req;
    const logMessage = `${new Date().toISOString()} - Method: ${method}, URL: ${url}\n`;

    console.log(logMessage);

    // Para escribir en un archivo
    fs.appendFile(path.join(__dirname, '..', 'log.txt'), logMessage, (err) => {
        if (err) console.log('Logging error:', err);
    });

    next();
}

module.exports = logRequests;
