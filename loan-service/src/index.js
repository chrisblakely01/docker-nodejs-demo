import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

const app = express();
const port = 3001;

dotenv.config();

const loans = [
  { bookId: 1, userName: "Alice", loanDate: "2023-04-01" },
  { bookId: 2, userName: "Bob", loanDate: "2023-04-15" },
  {
    bookId: 3,
    userName: "Charlie",
    loanDate: "2023-05-03",
  },
];

// set the endpoint of the bookService
// if running the app outside of docker compose, will default to localhost:3000
// if running the app as part of docker compose, will take the environment variable
const bookServiceEndpoint =
  process.env.BOOK_SERVICE_URL || "http://localhost:3000";

app.get("/loans", async (req, res) => {
  try {
    // fetch the books from the book service
    const response = await fetch(`${bookServiceEndpoint}/books`);
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    const books = await response.json();

    // for each loan record, search the response from the book service to get the book details
    // and append the book detail to the loan record
    const loanDetails = loans.map((loan) => {
      const bookDetails = books.find((book) => book.bookId === loan.bookId);
      return {
        userName: loan.userName,
        loanDate: loan.loanDate,
        book: bookDetails,
      };
    });
    res.json(loanDetails);
  } catch (error) {
    console.error("Error fetching book details:", error);
    res.status(500).send("Failed to fetch book details");
  }
});

app.listen(port, () => {
  console.log(`Loan Service running at http://localhost:${port}`);
});
