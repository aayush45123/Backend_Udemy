const { integer, varchar, pgTable, uuid , text} = require("drizzle-orm/pg-core");
const { author } = require("./author.model");

const books = pgTable("books", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description", { length: 1024 }),
  author_id: uuid("author_id")
    .notNull()
    .references(() => author.id),
});

module.exports = {
  books,
};
