import { Pool } from "pg";
import { Container } from "typedi";

export default async () => {
  try {
    const pool = new Pool({
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      port: parseInt(process.env.POSTGRES_PORT || "5432"),
    });

    // Register the pool in the container
    Container.set("db", pool);

    return pool;
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error);
    throw error;
  }
};
