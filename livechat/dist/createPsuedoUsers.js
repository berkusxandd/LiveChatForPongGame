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
exports.addUsers = addUsers;
const database_1 = __importDefault(require("./database"));
const insertUser = (index) => __awaiter(void 0, void 0, void 0, function* () {
    const email = `user${index}@example.com`;
    const username = `user${index}`;
    const passwordHash = 'aaaxxxbbb';
    yield database_1.default.run(`INSERT INTO users (email, username, password_hash) VALUES (?, ?, ?)`, [email, username, passwordHash]);
});
function addUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (let index = 0; index < 10; index++) {
                yield insertUser(index);
                console.log(`inserted user: ${index}`);
            }
            console.log(`all users inserted.`);
        }
        catch (error) {
            console.log(error);
        }
    });
}
