import { useEffect, useState } from "react";

import BookForm from "../components/BookForm";
import BookTable from "../components/BookTable";

function Books() {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem("books");

    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const addBook = (newBook) => {
    setBooks((currentBooks) => [...currentBooks, newBook]);
  };

  const deleteBook = (bookId) => {
    setBooks((currentBooks) =>
      currentBooks.filter((book) => book.id !== bookId)
    );
  };

  const editBook = (book) => {
    setEditingBook(book);
  };

  const updateBook = (updatedBook) => {
    setBooks((currentBooks) =>
      currentBooks.map((book) =>
        book.id === updatedBook.id ? updatedBook : book
      )
    );

    setEditingBook(null);
  };

  const cancelEdit = () => {
    setEditingBook(null);
  };

  return (
    <main>
      <h1>Book Management</h1>

      <BookForm
        onAddBook={addBook}
        onUpdateBook={updateBook}
        editingBook={editingBook}
        onCancelEdit={cancelEdit}
      />

      <BookTable
        books={books}
        onDeleteBook={deleteBook}
        onEditBook={editBook}
      />
    </main>
  );
}

export default Books;