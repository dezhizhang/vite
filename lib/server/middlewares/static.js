

const static = require('serve-static');

function serveStaticMiddleware(config) {
    return static(config.root);
}

module.exports = serveStaticMiddleware;
