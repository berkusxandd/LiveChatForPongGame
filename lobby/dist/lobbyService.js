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
exports.getLobbies = getLobbies;
exports.createLobby = createLobby;
exports.joinLobby = joinLobby;
const lobby_models_1 = __importDefault(require("./models/lobby.models"));
const user_lobbies_models_1 = __importDefault(require("./models/user_lobbies.models"));
function getLobbies(lobby_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const lobby = yield lobby_models_1.default.findByPk(lobby_id);
            if (!lobby) {
                throw { statusCode: 404, message: "Lobby is not found" };
            }
            const usersInLobby = yield user_lobbies_models_1.default.findAll({
                where: { lobby_id }
            });
            return { lobby, users: usersInLobby };
        }
        catch (error) {
            throw { statusCode: 500, message: "Database error retrieving lobby or users", details: error };
        }
    });
}
function createLobby(name, capacity, creator_id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const lobby = yield lobby_models_1.default.create({
                name,
                capacity,
                creator_id,
            });
            yield user_lobbies_models_1.default.create({
                user_id: creator_id,
                lobby_id: lobby.id,
            });
        }
        catch (error) {
            throw { statusCode: 500, message: "Database error creating lobby or user_lobby", details: error };
        }
    });
}
function joinLobby(userId, lobbyId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existing = yield user_lobbies_models_1.default.findOne({ where: { user_id: userId } });
            if (existing) {
                throw { statusCode: 400, message: "User is already in another lobby" };
            }
            yield user_lobbies_models_1.default.create({
                user_id: userId,
                lobby_id: lobbyId,
            });
        }
        catch (error) {
            if (error.statusCode && error.message) {
                throw error;
            }
            throw { statusCode: 500, message: "Database error while joining lobby", details: error };
        }
    });
}
