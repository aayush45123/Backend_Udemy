import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";
import userTable from "./user.model.js";

const urltable = pgTable("urls", {
  id: uuid("id").primaryKey().defaultRandom(),

  shortUrl: varchar("short_url", { length: 100 }).notNull().unique(),
  targetUrl: text("target_url").notNull(),

  user_id: uuid("user_id")
    .notNull()
    .references(() => userTable.id),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export default urltable;
