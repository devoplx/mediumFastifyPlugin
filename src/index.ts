import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import mediumApi from './services/api';

export interface MyPluginOptions {
	token: string
  }
  
declare module 'fastify' {
    interface FastifyInstance  {
        medium: {
			accountInfo: Function
		};
    }
    // interface FastifyReply {
    //     myPluginProp: number;
    // }
}


const myPluginAsync: FastifyPluginAsync<MyPluginOptions> = async (
    fastify,
    options
) => {
	mediumApi.token = options.token
	fastify.decorate("medium", mediumApi);
};

export default fp(myPluginAsync, {
    fastify: '4.x',
    name: 'my-plugin',
});
