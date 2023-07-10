import fp from 'fastify-plugin';
import mediumApi from './services/api';

const mediumPLugin = async (fastify, options) => {
  mediumApi.token = options.token;
  fastify.decorate("medium", mediumApi);
};
var src_default = fp(mediumPLugin, {
  fastify: "4.x",
  name: "Medium-Plugin"
});

export { src_default as default };
