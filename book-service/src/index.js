import express from "express";
import dotenv from "dotenv";

const app = express();
const port = 3000;
dotenv.config();

const books = [
  { id: 1, title: "1984", author: "George Orwell" },
  {
    id: 2,
    title: "Brave New World",
    author: "Aldous Huxley",
  },
  {
    id: 3,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
  },
];

app.get("/books", async (req, res) => {
  res.json(books);
});

app.listen(port, () => {
  console.log(`Book Service running at http://localhost:${port}`);
});
