"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinLobbySchema = void 0;
exports.joinLobbySchema = {
    body: {
        type: 'object',
        required: ['lobbyId', 'userId'],
        properties: {
            lobbyId: { type: 'integer' },
            userId: { type: 'integer' },
        },
    },
};
