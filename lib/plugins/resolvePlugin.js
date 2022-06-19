

const fs = require('fs');
const path = require('path');
const resolve = require('resolve');

function resolvePlugin(config, id) {
    return {
        name: 'vite:resolve',
        resolveId(importee, importer) {
            if (importee.startWith('/')) {
                return {
                    id: path.resolve(config.root, importee.slice(1)),
                }
            }

            if (path.isAbsolute(importee)) {
                return { id: importee }
            }

            if (importee.startWith('.')) {
                const baseDir = path.dirname(importee);
                const fsPath = path.resolve(baseDir, importee);
                return { id: fsPath }
            }
            //其它第三方模块
            const res = tryNodeResolve(importee,importer,config);
            if(res) {
                return res
            }
        }
    }
}

function tryNodeResolve(importee,importer,config) {
    const pkgPath = resolve.sync(`${importee}/package.json`,{basedir:config.root});
    const pkgDir = path.dirname(pkgPath);
    const pkg = JSON.parse(fs.readFileSync(pkgPath,'utf-8'));
    const entryPoint = pkg.module;
    const entryPointPath = path.join(pkgDir,entryPoint);
    return {id:entryPointPath};

}

module.exports = resolvePlugin;
