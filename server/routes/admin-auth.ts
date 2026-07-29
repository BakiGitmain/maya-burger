import "dotenv/config";
import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db";
import { requireAdmin } from "../middleware/admin-auth";

const router = Router();

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      !username.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    const result = await pool.query(
      `
        SELECT
          id,
          name,
          username,
          email,
          password_hash,
          role
        FROM admin_users
        WHERE username = $1
        AND is_active = TRUE
        LIMIT 1
      `,
      [username.trim()]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const admin = result.rows[0];

    const passwordMatches = await bcrypt.compare(
      password,
      admin.password_hash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign(
      {
        id: admin.id,
      },
      jwtSecret,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("admin_token", token, {
      ...cookieOptions,
      maxAge: 24 * 60 * 60 * 1000,
    });

    await pool.query(
      `
        UPDATE admin_users
        SET last_login = CURRENT_TIMESTAMP
        WHERE id = $1
      `,
      [admin.id]
    );

    return res.status(200).json({
      message: "Login successful",

      admin: {
        id: admin.id,
        name: admin.name,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.get("/me", requireAdmin, async (req, res) => {
  try {
    const adminId = res.locals.admin.id;

    const result = await pool.query(
      `
        SELECT
          id,
          name,
          username,
          email,
          role,
          last_login
        FROM admin_users
        WHERE id = $1
        AND is_active = TRUE
      `,
      [adminId]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      admin: result.rows[0],
    });
  } catch (error) {
    console.error("Get admin error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("admin_token", cookieOptions);

  return res.status(200).json({
    message: "Logged out successfully",
  });
});

export default router;