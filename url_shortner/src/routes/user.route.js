import express from "express";
import db from "../db/config.js";
import { userTable } from "../models/index.js";
import { eq } from "drizzle-orm";
import { randomBytes, createHmac } from "crypto";
import { signup  , login} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;
