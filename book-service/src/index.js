import express from "express";

import Book from "./models/bookModel.js";
import dbStart from "./db/db.js";
import dotenv from "dotenv";

const app = express();
const port = 3000;
dotenv.config();

dbStart();

app.get("/books", async (req, res) => {
  const books = await Book.find({});
  res.json(books);
});

app.listen(port, () => {
  console.log(`Book Service running at http://localhost:${port}`);
});
