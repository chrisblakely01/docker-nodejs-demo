import express from "express";

import Book from "./models/bookModel.js";
import dbStart from "./db/db.js";
import dotenv from "dotenv";

const app = express();
const port = 3000;
dotenv.config();

dbStart();

// const books = [
//   { id: 1, title: "1984", author: "George Orwell" },
//   {
//     id: 2,
//     title: "Brave New World",
//     author: "Aldous Huxley",
//   },
//   {
//     id: 3,
//     title: "The Catcher in the Rye",
//     author: "J.D. Salinger",
//   },
// ];

app.get("/books", async (req, res) => {
  const books = await Book.find({});
  res.json({ ...books, version: "v5" });
});

app.listen(port, () => {
  console.log(`Book Service running at http://localhost:${port}`);
});
