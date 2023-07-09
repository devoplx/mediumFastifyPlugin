import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import mediumApi from './services/api';

export interface MyPluginOptions {
    token: string
}
  
declare module 'fastify' {
    interface FastifyInstance  {
        medium: typeof mediumApi
    }
}

const mediumPLugin: FastifyPluginAsync<MyPluginOptions> = async (
    fastify,
    options
) => {
	mediumApi.token = options.token
	fastify.decorate("medium", mediumApi);
};

export default fp(mediumPLugin, {
    fastify: '4.x',
    name: 'Medium-Plugin',
});