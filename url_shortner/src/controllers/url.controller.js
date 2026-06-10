import { nanoid } from "nanoid";
import { createShortUrl } from "../services/url.service.js";
import db from "../db/config.js";
import urltable from "../models/url.model.js";
import { eq, and } from "drizzle-orm";

export const shortenUrl = async (req, res) => {
  const { targetUrl, code } = shortenUrlPostRequestSchema.parse(req.body);

  const shortcode = code || nanoid(8);

  const result = await createShortUrl({
    targetUrl,
    shortcode,
    userId: req.user.id,
  });

  return res.status(201).json(result);
};

export const redirectToTargetUrl = async (req, res) => {
  const shortcode = req.params.shortcode;

  const [result] = await db
    .select()
    .from(urltable)
    .where(eq(urltable.shortUrl, shortcode));

  if (!result) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  return res.redirect(result.targetUrl);
};

export const getUserUrls = async (req, res) => {
  const codes = await db
    .select()
    .from(urltable)
    .where(eq(urltable.user_id, req.user.id));

  return res.json({ codes });
};

export const deleteShortUrl = async (req, res) => {
  const id = req.params.id;

  const result = await db
    .delete(urltable)
    .where(and(eq(urltable.id, id), eq(urltable.user_id, req.user.id)));

  return res.json({ message: "Short URL deleted successfully" });
};
