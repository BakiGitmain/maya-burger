import "dotenv/config";

import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { pool } from "../db/index.js";
import { requireAdmin } from "../middleware/admin-auth.js";

const router = Router();

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

const emailPattern =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const usernamePattern =
  /^[a-zA-Z0-9._-]+$/;

/* ------------------------------ */
/* LOGIN                          */
/* ------------------------------ */

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
        message:
          "Username and password are required",
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
        WHERE LOWER(username) = LOWER($1)
        AND is_active = TRUE
        LIMIT 1
      `,
      [username.trim()]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message:
          "Invalid username or password",
      });
    }

    const admin = result.rows[0];

    const passwordMatches =
      await bcrypt.compare(
        password,
        admin.password_hash
      );

    if (!passwordMatches) {
      return res.status(401).json({
        message:
          "Invalid username or password",
      });
    }

    const jwtSecret =
      process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error(
        "JWT_SECRET is not defined"
      );
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

/* ------------------------------ */
/* CURRENT ADMIN                  */
/* ------------------------------ */

router.get(
  "/me",
  requireAdmin,
  async (req, res) => {
    try {
      const adminId =
        res.locals.admin.id;

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
      console.error(
        "Get admin error:",
        error
      );

      return res.status(500).json({
        message:
          "Internal server error",
      });
    }
  }
);

/* ------------------------------ */
/* UPDATE ACCOUNT                 */
/* ------------------------------ */

router.patch(
  "/account",
  requireAdmin,
  async (req, res) => {
    try {
      const adminId =
        res.locals.admin.id;

      const {
        name,
        username,
        email,
        currentPassword,
        newPassword,
      } = req.body;

      if (
        typeof name !== "string" ||
        typeof username !== "string" ||
        typeof email !== "string" ||
        typeof currentPassword !== "string"
      ) {
        return res.status(400).json({
          message:
            "Invalid account information",
        });
      }

      const cleanName = name.trim();
      const cleanUsername =
        username.trim();
      const cleanEmail =
        email.trim().toLowerCase();

      if (
        cleanName.length < 2 ||
        cleanName.length > 100
      ) {
        return res.status(400).json({
          message:
            "Name must be between 2 and 100 characters",
        });
      }

      if (
        cleanUsername.length < 3 ||
        cleanUsername.length > 50
      ) {
        return res.status(400).json({
          message:
            "Username must be between 3 and 50 characters",
        });
      }

      if (
        !usernamePattern.test(
          cleanUsername
        )
      ) {
        return res.status(400).json({
          message:
            "Username can only contain letters, numbers, dots, underscores and hyphens",
        });
      }

      if (
        !emailPattern.test(cleanEmail)
      ) {
        return res.status(400).json({
          message:
            "Enter a valid email address",
        });
      }

      if (!currentPassword) {
        return res.status(400).json({
          message:
            "Current password is required",
        });
      }

      if (
        newPassword !== undefined &&
        newPassword !== "" &&
        typeof newPassword !== "string"
      ) {
        return res.status(400).json({
          message:
            "Invalid new password",
        });
      }

      if (
        typeof newPassword ===
          "string" &&
        newPassword.length > 0 &&
        newPassword.length < 8
      ) {
        return res.status(400).json({
          message:
            "New password must be at least 8 characters",
        });
      }

      const currentResult =
        await pool.query(
          `
            SELECT
              id,
              name,
              username,
              email,
              password_hash,
              role
            FROM admin_users
            WHERE id = $1
            AND is_active = TRUE
            LIMIT 1
          `,
          [adminId]
        );

      if (
        currentResult.rows.length === 0
      ) {
        return res.status(404).json({
          message:
            "Admin account not found",
        });
      }

      const currentAdmin =
        currentResult.rows[0];

      const passwordMatches =
        await bcrypt.compare(
          currentPassword,
          currentAdmin.password_hash
        );

      if (!passwordMatches) {
        return res.status(401).json({
          message:
            "Current password is incorrect",
        });
      }

      const conflictResult =
        await pool.query(
          `
            SELECT
              username,
              email
            FROM admin_users
            WHERE id <> $1
            AND (
              LOWER(username) = LOWER($2)
              OR LOWER(email) = LOWER($3)
            )
            LIMIT 1
          `,
          [
            adminId,
            cleanUsername,
            cleanEmail,
          ]
        );

      if (
        conflictResult.rows.length > 0
      ) {
        const conflict =
          conflictResult.rows[0];

        if (
          conflict.username
            .toLowerCase() ===
          cleanUsername.toLowerCase()
        ) {
          return res.status(409).json({
            message:
              "That username is already being used",
          });
        }

        if (
          conflict.email.toLowerCase() ===
          cleanEmail
        ) {
          return res.status(409).json({
            message:
              "That email is already being used",
          });
        }
      }

      const passwordChanged =
        typeof newPassword ===
          "string" &&
        newPassword.length > 0;

      let passwordHash =
        currentAdmin.password_hash;

      if (passwordChanged) {
        passwordHash =
          await bcrypt.hash(
            newPassword,
            12
          );
      }

      const updateResult =
        await pool.query(
          `
            UPDATE admin_users
            SET
              name = $1,
              username = $2,
              email = $3,
              password_hash = $4,
              updated_at = CURRENT_TIMESTAMP
            WHERE id = $5
            RETURNING
              id,
              name,
              username,
              email,
              role,
              last_login
          `,
          [
            cleanName,
            cleanUsername,
            cleanEmail,
            passwordHash,
            adminId,
          ]
        );

      if (passwordChanged) {
        res.clearCookie(
          "admin_token",
          cookieOptions
        );
      }

      return res.status(200).json({
        message: passwordChanged
          ? "Account updated. Please sign in again."
          : "Account updated successfully",

        passwordChanged,

        admin:
          updateResult.rows[0],
      });
    } catch (error) {
      console.error(
        "Update account error:",
        error
      );

      return res.status(500).json({
        message:
          "Internal server error",
      });
    }
  }
);

/* ------------------------------ */
/* LOGOUT                         */
/* ------------------------------ */

router.post("/logout", (req, res) => {
  res.clearCookie(
    "admin_token",
    cookieOptions
  );

  return res.status(200).json({
    message:
      "Logged out successfully",
  });
});

export default router;