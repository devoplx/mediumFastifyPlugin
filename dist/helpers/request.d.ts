import { FastifyError } from '@fastify/error';
import { Response } from '../interfaces/functions.js';

declare const request: <T>(path: string, method?: string, headers?: {
    [key: string]: string;
}) => Promise<Response<T> | FastifyError>;

export { request };
