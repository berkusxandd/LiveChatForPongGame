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
const messages_models_1 = __importDefault(require("./models/messages.models"));
const sequelize_1 = require("sequelize");
function registerRoutes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.get("/", (req, res) => {
            return ({ message: "hello" });
        });
        fastify.get('/messages/:user1/:user2', (req, reply) => __awaiter(this, void 0, void 0, function* () {
            const { user1, user2 } = req.params;
            try {
                const messages = yield messages_models_1.default.findAll({
                    where: {
                        [sequelize_1.Op.or]: [
                            { sender_id: user1, receiver_id: user2 },
                            { sender_id: user2, receiver_id: user1 },
                        ],
                    },
                    order: [['timestamp', 'ASC']],
                });
                reply.send(messages);
            }
            catch (err) {
                console.error(err);
                reply.status(500).send({ error: 'Database error' });
            }
        }));
        fastify.get("/chat", (req, reply) => {
            reply.type('text/html').sendFile('index.html');
        });
    });
}
