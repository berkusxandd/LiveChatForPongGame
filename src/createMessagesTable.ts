import db from './database';
const createMessagesTable = (): Promise<void> => {
    const query = `
    CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender_id TEXT NOT NULL,
    receiver_id TEXT NOT NULL,
    message TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
    )`;

    return new Promise((resolve, reject) => {
        db.run(query, (err: any) => {
            if (err) {
                console.error("Failed to create messages table:", err);
                reject(err);
            } else {
                console.log("Messages table created or already exists");
                resolve();
            }
        });
    });
};
export default createMessagesTable;