import pkg from 'pg';
const { Pool } = pkg;   
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({ connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false } // This line enables SSL, even if certificates aren’t fully verified.
});

export async function connectDB() {
    try {
        const client = await pool.connect();
        console.log("Database connection established successfully");
        return client;
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        throw new Error("Database connection failed");
    }
}

