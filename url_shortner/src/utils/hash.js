import { randomBytes, createHmac } from "crypto";

export function hashPassword(password, usersalt = undefined) {
  const salt = usersalt ?? randomBytes(16).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  return { salt, password: hashedPassword };
}
