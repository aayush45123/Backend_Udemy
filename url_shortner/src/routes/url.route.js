import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { shortenUrl } from "../controllers/url.controller.js";
import { ensureAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/shorten", ensureAuthenticated, shortenUrl);

export default router;
