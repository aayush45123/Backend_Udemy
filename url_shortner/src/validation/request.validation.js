import { z } from "zod";

export const signUpPostRequestSchema = z.object({
  firstName: z.string(),
  lastName: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(8),
  salt: z.string().optional(),
});

export const loginPostRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const shortenUrlPostRequestSchema = z.object({
  targetUrl: z.string().url(),
  code : z.string().optional(),
});
