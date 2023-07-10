import fastify from 'fastify';
import meduiumApi from '../src/index';
import dotenv from 'dotenv';
import path from "path";

dotenv.config({ path: path.join(__dirname, ".env") });

const server = fastify();
server.register(meduiumApi, {
	token: process.env.TOKEN as string
});

server.get('/ping', async (request, reply) => {
	const accountInfo = await server.medium.accountInfo() as any;
    const publications = await server.medium.getPublications(accountInfo["id"]);
    const postData = await server.medium.getPostData("https://medium.com/@saboka8352/test-f933a9a0f88f");
    console.log(accountInfo, publications, postData);
    return { ping: "ping", accountInfo, publications, postData };
});

server.listen({ port: 8080 }, (err, address) => {
    if (err) throw err;
    console.log(`Server listening at ${address}`);
});
