import { Schema, model } from "mongoose";

const bookSchema = new Schema({
  bookId: Number,
  title: String,
  author: String,
});

const Book = model("Book", bookSchema);

export default Book;
