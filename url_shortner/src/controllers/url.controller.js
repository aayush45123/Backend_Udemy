import express from "express";
import { nanoid } from "nanoid";
import db from "../db/config.js";
import urltable from "../models/url.model.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { shortenUrlPostRequestSchema } from "../validation/request.validation.js";
import { ZodCodec } from "zod";

export const shortenUrl = async (req, res) => {


  const { targetUrl, code } = shortenUrlPostRequestSchema.parse(req.body);

  const shortcode = code || nanoid(8);

  const [result] = await db
    .insert(urltable)
    .values({
      shortUrl: shortcode,
      targetUrl: targetUrl,
      user_id: req.user.id,
    })
    .returning({
      id: urltable.id,
      shortUrl: urltable.shortUrl,
      targetUrl: urltable.targetUrl,
    });

  return res.status(201).json({
    id: result.id,
    shortUrl: result.shortUrl,
    targetUrl: result.targetUrl,
  });
};
