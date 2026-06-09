import { verifyToken } from "../utils/token.js";

export async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization header missing or malformed" });
  }

  const [_, token] = authHeader.split(" ");

  const payload = verifyToken(token);

  req.user = payload;

  next();
}
