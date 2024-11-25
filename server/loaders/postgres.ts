import { Pool } from "pg";
import { Container } from "typedi";

export default async () => {
  try {
    const pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT || "5432"),
    });

    // Register the pool in the container
    Container.set("pool", pool);

    return pool;
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error);
    throw error;
  }
};
