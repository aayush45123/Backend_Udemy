const express = require("express");

const app = express();

const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
  },
];

app.use(express.json());

app.get("/", (req, res) => {
  console.log("I got an incoming request");
  res.end("Thanks for visiting my server :)");
});

app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(book);
});

app.post("/books", (req, res) => {
  const { title, author } = req.body || {};

  if (!title || !author) {
    return res.status(400).json({ message: "Title and Author are required" });
  }

  const id = books.length + 1;
  const newBook = { id, title, author };

  books.push(newBook);
  res.status(201).json(newBook);
});

app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }
  const bookIndex = books.findIndex((b) => b.id === id);
  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }
  books.splice(bookIndex, 1);
  res.status(200).json({ message: "Book deleted successfully" });
});

app.listen(8000, () => {
  console.log(`Http server is up and running on port 8000`);
});
