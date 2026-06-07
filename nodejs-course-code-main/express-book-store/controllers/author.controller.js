const { author } = require("../models/author.model");
const { books } = require("../models/book.model");

const db = require("../db/config");
const { eq } = require("drizzle-orm");

exports.getAllAuthors = async (req, res) => {
  const allauthors = await db.select().from(author);
  return res.json(allauthors);
};
exports.getAuthorById = async (req, res) => {
  const id = req.params.id;
  const authorById = await db.select().from(author).where(eq(author.id, id));
  return res.json(authorById);
};
exports.createAuthor = async (req, res) => {
  const { firstName, lastName, email } = req.body;

  const [author] = await db
    .insert(author)
    .values({ firstName, lastName, email })
    .returning({ id: author.id });

  return res.status(201).json({
    message: "Author created successfully",
    authorId: author.id,
  });
};

exports.deleteAuthor = async (req, res) => {
  const id = req.params.id;
  const deletedAuthor = await db.delete(author).where(eq(author.id, id));
  return res.status(200).json({ message: "Author deleted successfully" });
};

exports.authorBooks = async (req, res) => {
  const id = req.params.id;
  const authorBooks = await db
    .select()
    .from(books)
    .where(eq(books.author_id, id));
  return res.json(authorBooks);
};
