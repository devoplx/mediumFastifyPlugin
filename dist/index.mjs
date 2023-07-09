import fp from 'fastify-plugin';
import mediumApi from './services/api';

const myPluginAsync = async (fastify, options) => {
  mediumApi.token = options.token;
  fastify.decorate("medium", mediumApi);
};
var src_default = fp(myPluginAsync, {
  fastify: "4.x",
  name: "my-plugin"
});

export { src_default as default };
