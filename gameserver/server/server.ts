import Fastify from 'fastify';
import path from 'path';
import { fileURLToPath } from 'url';
import fastifyStatic from '@fastify/static';

const fastify = Fastify({logger: true});
const PORT = 3000;

fastify.register(fastifyStatic, {
  root: path.join(process.cwd(), 'public'),
  prefix: '/',
});

fastify.get('/', (_, reply) => {
  reply.sendFile('index.html')
});
fastify.get('/api/ping', async (req, reply) => {
  return { pong: true };
});

fastify.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});