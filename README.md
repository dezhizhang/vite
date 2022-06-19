# vite

### vite.config.js

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

### connect

```js
const connect = require('connect');
const http = require('http');

const middileware = connect();
middileware.use((req, res, next) => {
  console.log('middleware1');
  next();
});

middileware.use((req, res, next) => {
  console.log('middleware2');
  next();
});

middileware.use((req, res) => {
  res.end('hello');
});

http.createServer(middileware).listen(3001, () => console.log(3001));
```

### es-module-lexer

```js
const { init, parse } = require('es-module-lexer');
let sourceCode = `import _ from 'lodash';\n export var age = 12;`;
(async () => {
  await init;
  const [imports, exports] = parse(sourceCode);
  console.log(imports);
  console.log(exports);
})();
```

### resolve

```js
const resolve = require('resolve');

const res = resolve.sync('check-is-array', { basedir: __dirname });

console.log(res);
```

### fast-glob

```js
const fastGlob = require('fast-glob');

(async function () {
  const entries = await fastGlob(['**/*.js']);
  console.log(entries);
})();
```
