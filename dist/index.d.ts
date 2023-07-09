import * as fastify from 'fastify';
import { FastifyPluginAsync } from 'fastify';
import _default$1 from './services/api.js';

interface MyPluginOptions {
    token: string;
}
declare module 'fastify' {
    interface FastifyInstance {
        medium: typeof _default$1;
    }
}
declare const _default: FastifyPluginAsync<MyPluginOptions, fastify.RawServerDefault, fastify.FastifyTypeProviderDefault>;

export { MyPluginOptions, _default as default };
