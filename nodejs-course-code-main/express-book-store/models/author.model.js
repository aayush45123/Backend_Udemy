const { varchar, pgTable, uuid, text } = require("drizzle-orm/pg-core");

const author = pgTable("authors", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: varchar("firstName", { length: 256 }).notNull(),
  lastName: text("lastName"),
  email: varchar("email", { length: 256 }).notNull(),
});

module.exports = {
  author,
};
