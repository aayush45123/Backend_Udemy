import db from "../db/config.js";
import { userTable } from "../models/index.js";
import { eq } from "drizzle-orm";
import { randomBytes, createHmac } from "crypto";
import { hashPassword } from "../utils/hash.js";
import { generateToken } from "../utils/token.js";
import { findUserByEmail, createUser } from "../services/user.service.js";
import jwt from "jsonwebtoken";
import {
  signUpPostRequestSchema,
  loginPostRequestSchema,
} from "../validation/request.validation.js";

export const signup = async (req, res) => {
  const validationResult = await signUpPostRequestSchema.safeParseAsync(
    req.body,
  );

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.format() });
  }
  const { firstName, lastName, email, password } = validationResult.data;

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  const { salt, password: hashedPassword } = hashPassword(password);

  const newUser = await createUser({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    salt,
  });

  return res
    .status(201)
    .json({ message: "User created successfully", userId: newUser.id });
};

export const login = async (req, res) => {
  const validationResult = await loginPostRequestSchema.safeParseAsync(
    req.body,
  );

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.format() });
  }

  const { email, password } = validationResult.data;

  const existingUser = await findUserByEmail(email);

  if (!existingUser) {
    return res.status(400).json({ error: "Invalid email" });
  }

  const { salt, password: hashedPassword } = hashPassword(
    password,
    existingUser.salt,
  );

  if (hashedPassword !== existingUser.password) {
    return res.status(400).json({ error: "Invalid password" });
  }
  const token = await generateToken({ id: existingUser.id });

  return res.json({ token });
};
