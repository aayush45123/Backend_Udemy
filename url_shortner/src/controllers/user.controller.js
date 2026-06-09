import db from "../db/config.js";
import { userTable } from "../models/index.js";
import { eq } from "drizzle-orm";
import { randomBytes, createHmac } from "crypto";
import { hashPassword } from "../utils/hash.js";
import { signUpPostRequestSchema } from "../validation/request.validation.js";

export const signup = async (req, res) => {
  const validationResult = await signUpPostRequestSchema.safeParseAsync(
    req.body,
  );

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.format() });
  }
  const { firstName, lastName, email, password } = validationResult.data;

  const [existingUser] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email));

  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  const { salt, password: hashedPassword } = hashPassword(password);

  const [newUser] = await db
    .insert(userTable)
    .values({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      salt,
    })
    .returning({ id: userTable.id });

  return res
    .status(201)
    .json({ message: "User created successfully", userId: newUser.id });
};
