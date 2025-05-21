//backend/auth-service/src/migration/createUsersTable.ts
import db from './database';
const createUsersTable = (): Promise<void> => {
    const query = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT,
        reset_token TEXT,
        reset_token_expiry INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

    return new Promise((resolve, reject) => {
        db.run(query, (err: any) => {
            if (err) {
                console.error("Failed to create users table:", err);
                reject(err);
            } else {
                console.log("Users table created or already exists");
                resolve();
            }
        });
    });
};
export default createUsersTable;