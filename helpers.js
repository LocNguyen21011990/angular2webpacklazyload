const { resolve, isAbsolute } = require('path');

exports.root = function (path) {
  return resolve(__dirname, path)
};

exports.stripUnused = function (array) {
  return array.filter(it => !!it);
};

exports.only = function (crit, value) {
  return crit ? value : undefined;
};

exports.checkNodeImport = function (context, request, cb) {
  if (!isAbsolute(request) && request.charAt(0) !== '.') {
    cb(null, 'commonjs ' + request); return;
  }
  cb();
};
