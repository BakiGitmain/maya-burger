import "dotenv/config";

import express from "express";
import cookieParser from "cookie-parser";

import adminAuthRouter from "../routes/admin-auth";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/admin", adminAuthRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Maya Burger API is running",
  });
});

export default app;