import { nanoid } from "nanoid";
import { createShortUrl } from "../services/url.service.js";

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
