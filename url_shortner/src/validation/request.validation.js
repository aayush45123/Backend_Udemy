import { z } from "zod";

export const signUpPostRequestSchema = z.object({
  firstName: z.string(),
  lastName: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(8),
});
