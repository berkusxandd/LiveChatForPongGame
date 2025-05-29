"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
exports.initDb = initDb;
exports.db = new sqlite3_1.sqlite3.Database('./tournament.db');
function initDb() {
    exports.db.serialize(() => {
        exports.db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      )
    `);
        exports.db.run(`
      CREATE TABLE IF NOT EXISTS lobbies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        capacity INTEGER NOT NULL
      )
    `);
        exports.db.run(`
      CREATE TABLE IF NOT EXISTS matches (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lobby_id INTEGER,
        scheduled_at TEXT,
        FOREIGN KEY (lobby_id) REFERENCES lobbies(id)
      )
    `);
    });
}
