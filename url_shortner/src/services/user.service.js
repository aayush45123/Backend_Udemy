import db from "../db/config.js";
import { eq } from "drizzle-orm";
import { userTable } from "../models/index.js";

export async function findUserByEmail(email) {
  const [existingUser] = await db
    .select({
      id: userTable.id,
      firstName: userTable.firstName,
      lastName: userTable.lastName,
      email: userTable.email,
      salt: userTable.salt,
      password: userTable.password,
    })
    .from(userTable)
    .where(eq(userTable.email, email));

  return existingUser;
}

export async function createUser({
  firstName,
  lastName,
  email,
  password,
  salt,
}) {
  const [newUser] = await db
    .insert(userTable)
    .values({
      firstName,
      lastName,
      email,
      password,
      salt,
    })
    .returning({ id: userTable.id });

  return newUser;
}
