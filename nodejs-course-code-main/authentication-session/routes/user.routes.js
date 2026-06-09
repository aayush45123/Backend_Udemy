import express from "express";
import db from "../db/index.js";
import { usersTable, userSessions } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { randomBytes, createHmac } from "node:crypto";
import jwt from "jsonwebtoken";
import {
  updateUser,
  getUser,
  signUp,
  login,
} from "../controllers/user.controller.js";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.patch("/", ensureAuthenticated, updateUser);

router.get("/", ensureAuthenticated, getUser);

router.post("/signup", signUp);

router.post("/login", login);

export default router;
