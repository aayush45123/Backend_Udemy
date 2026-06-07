const express = require("express");
const { BOOKS } = require("../models/book.model");
const {
  getBooks,
  getBookById,
  createBook,
  deleteBook,
} = require("../controllers/book.controller");

const router = express.Router();

router.get("/", getBooks);

router.get("/:id", getBookById);

router.post("/", createBook);

router.delete("/:id", deleteBook);

module.exports = router;
