'use strict';

var fp = require('fastify-plugin');
var mediumApi = require('./services/api');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var fp__default = /*#__PURE__*/_interopDefault(fp);
var mediumApi__default = /*#__PURE__*/_interopDefault(mediumApi);

const mediumPLugin = async (fastify, options) => {
  mediumApi__default.default.token = options.token;
  fastify.decorate("medium", mediumApi__default.default);
};
var src_default = fp__default.default(mediumPLugin, {
  fastify: "4.x",
  name: "Medium-Plugin"
});

module.exports = src_default;
