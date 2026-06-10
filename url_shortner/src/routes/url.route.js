import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  shortenUrl,
  redirectToTargetUrl,
  getUserUrls,
  deleteShortUrl,
} from "../controllers/url.controller.js";
import { ensureAuthenticated } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/shorten", ensureAuthenticated, shortenUrl);

router.get("/codes", ensureAuthenticated, getUserUrls);

router.delete("/:id", ensureAuthenticated, deleteShortUrl);

router.get("/:shortcode", redirectToTargetUrl);

export default router;
