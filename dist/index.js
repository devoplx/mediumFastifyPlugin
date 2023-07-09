'use strict';

var fp = require('fastify-plugin');
var mediumApi = require('./services/api');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var fp__default = /*#__PURE__*/_interopDefault(fp);
var mediumApi__default = /*#__PURE__*/_interopDefault(mediumApi);

const myPluginAsync = async (fastify, options) => {
  mediumApi__default.default.token = options.token;
  fastify.decorate("medium", mediumApi__default.default);
};
var src_default = fp__default.default(myPluginAsync, {
  fastify: "4.x",
  name: "my-plugin"
});

module.exports = src_default;
