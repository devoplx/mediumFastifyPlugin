import fastify from 'fastify';
import mediumApi from '../src/index';

const server = fastify();

server.register(mediumApi, {
	token: ''
});

server.get('/ping', async (request, reply) => {
	const accountInfo = await server.medium.accountInfo();
    const publications = await server.medium.getPublications("1f8472ea0e70c1d3b2a40b41b1e250a829d1b347bc9a9aae551222b66f90eaacd");
    const postData = await server.medium.getPostData("https://medium.com/dev-genius/k8s-tools-k8sgpt-1fd35e6affc");
    //console.log(accountInfo, publications, postData)
    //console.log(accountInfo);
    console.log(postData);
    return { ping: "ping", accountInfo, publications, postData };
});

server.listen({ port: 8080 }, (err, address) => {
    if (err) throw err;
    console.log(`Server listening at ${address}`);
});
