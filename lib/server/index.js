const connect = require('connect');

function createServer() {
    const middleWares = connect();
    const server = {
        async listen(port,callback) {
            require('http').createServer(middleWares).listen(port,callback)
        }
    }
    return server;
}


exports.createServer = createServer;
