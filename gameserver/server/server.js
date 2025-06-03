var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Fastify from 'fastify';
import path from 'path';
import fastifyStatic from '@fastify/static';
const fastify = Fastify({ logger: true });
const PORT = 3000;
fastify.register(fastifyStatic, {
    root: path.join(process.cwd(), 'public'),
    prefix: '/',
});
fastify.get('/', (_, reply) => {
    reply.sendFile('index.html');
});
fastify.get('/api/ping', (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    return { pong: true };
}));
fastify.listen({ port: PORT }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server running at ${address}`);
});
