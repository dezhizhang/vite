const fastGlob = require('fast-glob');

(async function() {
    const entries = await fastGlob(["**/*.js"]);
    console.log(entries);
    
})()