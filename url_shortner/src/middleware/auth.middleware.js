import { verifyToken } from "../utils/token.js";

export async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  console.log("Auth Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization header missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  const payload = await verifyToken(token);

  console.log("Payload:", payload);

  req.user = payload;

  next();
}

export const ensureAuthenticated = (req, res, next) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
