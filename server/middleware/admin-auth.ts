import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { pool } from "../db/index.js";

type AdminToken = {
  id: number;
};

export const requireAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.admin_token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(token, jwtSecret);

    if (
      typeof decoded === "string" ||
      typeof decoded.id !== "number"
    ) {
      return res.status(401).json({
        message: "Invalid session",
      });
    }

    const tokenData = decoded as AdminToken;

    const result = await pool.query(
      `
        SELECT id, role
        FROM admin_users
        WHERE id = $1
        AND is_active = TRUE
      `,
      [tokenData.id]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    res.locals.admin = result.rows[0];

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        message: "Session expired",
      });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: "Invalid session",
      });
    }

    console.error("Admin authentication error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};