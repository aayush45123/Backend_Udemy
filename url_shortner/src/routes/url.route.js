import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  shortenUrl,
  redirectToTargetUrl,
  getUserUrls,
} from "../controllers/url.controller.js";
import { ensureAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/shorten", ensureAuthenticated, shortenUrl);

router.get("/codes", getUserUrls);

router.get("/:shortcode", redirectToTargetUrl);

export default router;
