import db from "./database";

const insertUser = async (index: number) => {
    const email = `user${index}@example.com`;
    const username = `user${index}`;
    const passwordHash = 'aaaxxxbbb'
    await db.run(
      `INSERT INTO users (email, username, password_hash) VALUES (?, ?, ?)`,
      [email, username, passwordHash]
    );
  };

export async function addUsers()
{
    try {
        for (let index = 0; index < 10; index++) 
        {
            await insertUser(index)
            console.log(`inserted user: ${index}`)
        }
        console.log(`all users inserted.`)
    } 
    catch (error) 
    {
        console.log(error)
    }
}