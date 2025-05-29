"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = registerRoutes;
const database_1 = __importDefault(require("./database"));
function registerRoutes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.get("/", (req, res) => {
            return ({ message: "hello" });
        });
        fastify.get('/messages/:user1/:user2', (req, reply) => {
            const { user1, user2 } = req.params;
            database_1.default.all(`SELECT * FROM messages 
     WHERE (sender_id = ? AND receiver_id = ?) 
        OR (sender_id = ? AND receiver_id = ?)
     ORDER BY timestamp ASC`, [user1, user2, user2, user1], (err, rows) => {
                if (err) {
                    console.error(err);
                    return reply.status(500).send({ error: 'Database error' });
                }
                reply.send(rows);
            });
        });
        fastify.get("/chat", (req, reply) => {
            reply.type('text/html').sendFile('index.html');
        });
    });
}
