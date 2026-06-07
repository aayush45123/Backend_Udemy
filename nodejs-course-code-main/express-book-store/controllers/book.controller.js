const {books} = require("../models/book.model");
const db = require("../db/config");
const { eq } = require("drizzle-orm");

exports.getBooks = async (req, res) => {
  const allBooks = await db.select().from(books);

  return res.json(allBooks);
};

exports.getBookById = async (req, res) => {
  const id = req.params.id;

  const book = await db.select().from(books).where(eq(books.id, id)); // SELECT * from books where id = {id}

  if (!book)
    return res
      .status(404)
      .json({ error: `Book with id ${id} does not exists!` });

  return res.json(book);
};

exports.createBook = async (req, res) => {
  const { title, description, author_id } = req.body;

  if (!title || title === "")
    return res.status(400).json({ error: "title is required" });

  const [result] = await db
    .insert(books)
    .values({ title, description, author_id })
    .returning({ id: books.id });

  return res.status(201).json({
    message: "Book created successfully",
    bookId: result.id,
  });
};

exports.deleteBook = async (req, res) => {
  const id = req.params.id;

  await db.delete(books).where(eq(books.id, id));

  return res.status(200).json({ message: "book deleted" });
};
