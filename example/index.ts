import fastify from 'fastify';
import myPluginAsync from '../src/index';

const server = fastify();
server.register(myPluginAsync, {
	token: '20da4dec0c6fce56f69e44a3487ddf0316bf1afd538a2baa431672196815dd866'
});

server.get('/ping', async (request, reply) => {
	const data = await server.medium.accountInfo();
	console.log(data);
    return {ping: "ping",data};
});

server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
