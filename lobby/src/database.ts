import sqlite3  from "sqlite3";

export const db = new sqlite3.Database('./tournament.db');

export function initDb() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS lobbies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        capacity INTEGER NOT NULL,
        creator_id INTEGER
      )
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS user_lobbies (
        user_id INTEGER PRIMARY KEY,
        lobby_id INTEGER,
        FOREIGN KEY (lobby_id) REFERENCES lobbies(id)
      )
    `);
  });
}