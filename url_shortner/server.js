import dotenv from "dotenv";
dotenv.config();
import express from "express";

import { authMiddleware } from "../src/middlewares/auth.middleware.js";

import userRoutes from "./src/routes/user.route.js";

const app = express();
app.use(express.json());
app.use(authMiddleware);

app.use("/users", userRoutes);

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Welcome to the URL Shortener Service!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
