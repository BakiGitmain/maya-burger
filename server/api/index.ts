import "dotenv/config";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import adminAuthRouter from "../routes/admin-auth.js";
import burgerRouter from "../routes/burgers.js";

const app = express();

const PORT =
  Number(process.env.PORT) || 5000;

const allowedOrigins = (
  process.env.CLIENT_URL ??
  "http://localhost:3000"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(
  "/api/admin",
  adminAuthRouter
);

app.use(
  "/api/burgers",
  burgerRouter
);
app.get("/api/health", (_req, res) => {
  return res.status(200).json({
    success: true,
    status: "ok",
    service: "maya-burger-api",
    timestamp: new Date().toISOString(),
  });
});
app.get("/", (req, res) => {
  return res.status(200).json({
    message:
      "Maya Burger API is running",
  });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(
      `Maya Burger API running on http://localhost:${PORT}`
    );
  });
}

export default app;