import "dotenv/config";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined");
}

const connectionString = databaseUrl.replace(
  "sslmode=require",
  "sslmode=verify-full"
);

export const pool = new Pool({
  connectionString,
});