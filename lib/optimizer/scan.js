const path = require('path');
const { build } = require('esbuild')
const esBuildScanPlugin = require('./esBuildScanPlugin')

async function scanImports(config) {
    const depImports = {};
    const esPlugin = await esBuildScanPlugin(config,depImports);
    await build({
        absWorkingDir:config.root,
        entryPoints:[path.resolve('./index.html')],
        bundle:true,
        format:'esm',
        write:true,
        outfile:'build/index.js',
        plugins:[esPlugin]
    })

    return depImports;
}

module.exports = scanImports;
