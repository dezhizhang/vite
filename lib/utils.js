

function normalizePath(id) {
    return id && id.replace(/\\/g,'/')
}

exports.normalizePath = normalizePath;
