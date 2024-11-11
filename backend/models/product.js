import { connectDB } from "../config/db.js";

async function createTables(){
    const client = await connectDB();
    try{
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS products(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                image TEXT ,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP DEFAULT null
            );    
        `

        const result = await client.query(createTableQuery);

        console.log(result);
        console.log("Table created successfully.");
    }
    catch(error) {
        console.error(`"error creating tables ${error}`);
    }
    finally{
        //releasing the client after creating table. 
        client.release();
    }
}

createTables();