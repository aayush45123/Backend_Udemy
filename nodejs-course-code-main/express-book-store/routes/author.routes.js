const express = require("express");
const { author } = require("../models/author.model");
const {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  deleteAuthor,
  authorBooks,
} = require("../controllers/author.controller");

const router = express.Router();

router.get("/", getAllAuthors);

router.get("/:id", getAuthorById);

router.get("/:id/books", authorBooks);

router.post("/", createAuthor);

router.delete("/:id", deleteAuthor);

module.exports = router;
