const allowedOrigins = require('../configFile/allowedOrigins')

const credentials = (req, rees, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        resizeBy.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

module.exports = credentials