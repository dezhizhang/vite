

const fs = require('fs-extra');
const resolve = require('resolve');
const path = require('path');
const resolvePlugin = require('../plugins/resolvePlugin');
const createPluginContainer = require('../server/createPluginContainer');
const htmlTypeRegExp = /\.html$/;




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
            //读取文件
            build.onLoad({ filter: /s/ }, async ({ path }) => {

            })
        }
    }
}

module.exports = esBuildScanPlugin;
