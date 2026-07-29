import "dotenv/config";

import express from "express";
import cookieParser from "cookie-parser";

import adminAuthRouter from "./routes/admin-auth";

const app = express();

const PORT = Number(process.env.PORT) || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/admin", adminAuthRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Maya Burger API is running",
  });
});

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(
      `Maya Burger API running on http://localhost:${PORT}`
    );
  });
}

export default app;