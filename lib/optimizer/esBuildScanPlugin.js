

const fs = require('fs-extra');
const resolve = require('resolve');
const path = require('path');
const resolvePlugin = require('../plugins/resolvePlugin');
const {createPluginContainer} = require('../server/createPluginContainer');
const { normalizePath } = require('../utils');
const htmlTypeRegExp = /\.html$/;
const jsTypeRegExp = /\.js$/
const scriptModuleRegExp = /<script\s+type="module"\s+src\="(.+?)"><\/script>/;


async function esBuildScanPlugin(config, depImports) {
    config.plugins = [resolvePlugin(config)];

    const container = await createPluginContainer(config);
    const resolve = async (importee, importer) => {
        return await container.resolveId(importee, importer);
    }
    return {
        name: 'vite:dep-scan',
        setup(build) {
            //用来解析路径
            build.onResolve({ filter: htmlTypeRegExp }, async ({ path, importer }) => {
                const resolved = await resolve(path, importer);
                if (resolved) {
                    return {
                        path: resolved.id || resolved,
                        namespace: 'html'
                    }
                }
            });

            build.onResolve({ filter: /.*/ }, async ({ path, importer }) => {
                const resolved = await resolve(path, importer);
                if (resolved) {
                    const id = resolved.id || resolved;
                    const included = id.includes('node_modules');
                    if (included) {
                        depImports[path] = normalizePath(id);
                        return {
                            path: id,
                            external: true
                        }
                    }
                    return { path: id }
                }
            })

            //读取文件
            build.onLoad({ filter: htmlTypeRegExp, namespace: 'html' }, async ({ path:id }) => {
                const html = fs.readFileSync(id, 'utf-8');
                const [, scriptSrc] = html.match(scriptModuleRegExp);
                const js = `import ${JSON.stringify(scriptSrc)}`;
                return {
                    contents: js,
                    loader: 'js'
                }
            })

            // 读取js
            build.onLoad({ filter: jsTypeRegExp }, async ({ path:id }) => {
                const ext = path.extname(id).slice(1);
                const contents = fs.readFileSync(id, 'utf-8');
                return {
                    contents,
                    loader: ext
                }
            })
        }
    }
}

module.exports = esBuildScanPlugin;
