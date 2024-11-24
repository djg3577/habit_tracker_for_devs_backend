"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const typedi_1 = require("typedi");
exports.default = async () => {
    try {
        const pool = new pg_1.Pool({
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            port: parseInt(process.env.POSTGRES_PORT || "5432"),
        });
        // Register the pool in the container
        typedi_1.Container.set("db", pool);
        return pool;
    }
    catch (error) {
        console.error("Error connecting to PostgreSQL:", error);
        throw error;
    }
};
//# sourceMappingURL=postgres.js.map