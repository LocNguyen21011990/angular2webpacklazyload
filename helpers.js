const { resolve } = require('path');

exports.root = function (path) {
  return resolve(__dirname, path)
};

exports.stripUnused = function (array) {
  return array.filter(it => !!it);
};

exports.only = function (crit, value) {
  return crit ? value : undefined;
};
