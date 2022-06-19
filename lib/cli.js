const { createServer } = require('./server');

;(async function() {
    const server = await createServer();
    server.listen(8000,() => {
        console.log('server in 8000')
    })
})()

