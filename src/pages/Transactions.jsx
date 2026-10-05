import { useEffect, useState } from "react";

import TransactionForm from "../components/TransactionForm";
import TransactionHistory from "../components/TransactionHistory";

function Transactions() {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem("books");

    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  const [transactions, setTransactions] = useState(() => {
    const savedTransactions =
      localStorage.getItem("transactions");

    return savedTransactions
      ? JSON.parse(savedTransactions)
      : [];
  });

  const [selectedBookId, setSelectedBookId] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  const addTransaction = (book, action, amount) => {
    const newTransaction = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      bookTitle: book.title,
      action: action,
      quantity: amount,
    };

    setTransactions((currentTransactions) => [
      newTransaction,
      ...currentTransactions,
    ]);
  };

  const addStock = () => {
    if (!selectedBookId || quantity === "") {
      alert("Please select a book and enter a quantity.");
      return;
    }

    const amount = Number(quantity);

    if (amount <= 0) {
      alert("Quantity must be greater than zero.");
      return;
    }

    const selectedBook = books.find(
      (book) => book.id === Number(selectedBookId)
    );

    if (!selectedBook) {
      alert("Book not found.");
      return;
    }

    const updatedBooks = books.map((book) =>
      book.id === selectedBook.id
        ? {
            ...book,
            quantity: book.quantity + amount,
          }
        : book
    );

    setBooks(updatedBooks);

    addTransaction(selectedBook, "Stock Added", amount);

    setQuantity("");
    setSelectedBookId("");
  };

  const borrowBook = () => {
    if (!selectedBookId || quantity === "") {
      alert("Please select a book and enter a quantity.");
      return;
    }

    const amount = Number(quantity);

    if (amount <= 0) {
      alert("Quantity must be greater than zero.");
      return;
    }

    const selectedBook = books.find(
      (book) => book.id === Number(selectedBookId)
    );

    if (!selectedBook) {
      alert("Book not found.");
      return;
    }

    if (amount > selectedBook.quantity) {
      alert("There is not enough stock available.");
      return;
    }

    const updatedBooks = books.map((book) =>
      book.id === selectedBook.id
        ? {
            ...book,
            quantity: book.quantity - amount,
          }
        : book
    );

    setBooks(updatedBooks);

    addTransaction(selectedBook, "Book Borrowed", amount);

    setQuantity("");
    setSelectedBookId("");
  };

  return (
    <main>
      <h1>Transactions</h1>

      <TransactionForm
        books={books}
        selectedBookId={selectedBookId}
        setSelectedBookId={setSelectedBookId}
        quantity={quantity}
        setQuantity={setQuantity}
        onAddStock={addStock}
        onBorrowBook={borrowBook}
      />

      <TransactionHistory
        transactions={transactions}
      />
    </main>
  );
}

export default Transactions;