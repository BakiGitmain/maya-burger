import "dotenv/config";
import bcrypt from "bcrypt";
import { pool } from "../db";

const createAdmin = async () => {
  const name = process.env.ADMIN_NAME;
  const username = process.env.ADMIN_USERNAME;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const role = process.env.ADMIN_ROLE;

  if (
    !name ||
    !username ||
    !email ||
    !password ||
    !role
  ) {
    console.error("Missing admin environment variables");
    process.exit(1);
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);

    const result = await pool.query(
      `
        INSERT INTO admin_users (
          name,
          username,
          email,
          password_hash,
          role
        )
        VALUES ($1, $2, $3, $4, $5)

        RETURNING
          id,
          name,
          username,
          email,
          role
      `,
      [
        name,
        username,
        email,
        passwordHash,
        role,
      ]
    );

    console.log("Admin created successfully");
    console.log(result.rows[0]);
  } catch (error) {
    console.error("Failed to create admin:", error);
  } finally {
    await pool.end();
  }
};

createAdmin();