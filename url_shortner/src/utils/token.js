import jwt from "jsonwebtoken";
import { tokenValidationSchema } from "../validation/token.validation.js";

const JWT_SECRET = process.env.JWT_SECRET;

export async function generateToken(payload) {
  const validationResult = await tokenValidationSchema.safeParseAsync(payload);

  if (validationResult.error) {
    throw new Error("Invalid payload for token generation");
  }

  const validatedPayload = validationResult.data;
  const token = jwt.sign(validatedPayload, JWT_SECRET, { expiresIn: "1h" });
  return token;
}
