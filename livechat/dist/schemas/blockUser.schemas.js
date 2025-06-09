"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockUserSchema = void 0;
exports.blockUserSchema = {
    body: {
        type: 'object',
        required: ['user1', 'user2'],
        properties: {
            user1: { type: 'string' },
            user2: { type: 'string' },
        },
    },
};
