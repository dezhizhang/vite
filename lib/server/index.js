const connect = require('connect');
const serveStaticMiddleware = require('./middlewares/static');
const resolveConfig = require('../config');
const { createOptimizeDepsRun } = require('../optimizer');
async function createServer() {
    const config = await resolveConfig();
    const middleWares = connect();
    const server = {
        async listen(port,callback) {
            require('http').createServer(middleWares).listen(port,callback)
        }
    }
    middleWares.use(serveStaticMiddleware(config));

    return server;
}


async function runOptimize(config,server) {
    await createOptimizeDepsRun(config);

}


exports.createServer = createServer;
