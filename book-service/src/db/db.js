import { connect } from "mongoose";

import Book from "../models/bookModel.js";

const initialBooks = [
  { bookId: 1, title: "1984", author: "George Orwell" },
  { bookId: 2, title: "Brave New World", author: "Aldous Huxley" },
  { bookId: 3, title: "The Catcher in the Rye", author: "J.D. Salinger" },
];

const initializeBookData = async () => {
  const booksExist = await Book.countDocuments();
  if (booksExist === 0) {
    console.log("Seeding the database with initial book data...");
    await Book.insertMany(initialBooks);
    console.log("Database seeded successfully");
  } else {
    console.log("Books already exist in the database.");
  }
};

const dbStart = () => {
  connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log("MongoDB connected: " + process.env.DATABASE_URL);
      initializeBookData();
    })
    .catch((err) => console.error("MongoDB connection error:", err));
};

export default dbStart;
