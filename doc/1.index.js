const connect = require('connect');
const http = require('http');

const middileware = connect();
middileware.use((req,res,next) => {
    console.log('middleware1');
    next();
});

middileware.use((req,res,next) => {
    console.log('middleware2');
    next();
});

middileware.use((req,res) => {
    res.end('hello')
});

http.createServer(middileware).listen(3001,() => console.log(3001))

