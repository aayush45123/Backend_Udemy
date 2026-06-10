import db from "../db/config.js";
import urltable from "../models/url.model.js";

export async function createShortUrl({ targetUrl, shortcode, userId }) {
  const [result] = await db
    .insert(urltable)
    .values({
      shortUrl: shortcode,
      targetUrl,
      user_id: userId,
    })
    .returning({
      id: urltable.id,
      shortUrl: urltable.shortUrl,
      targetUrl: urltable.targetUrl,
    });

  return result;
}
