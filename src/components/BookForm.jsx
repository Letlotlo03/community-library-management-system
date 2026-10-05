import { useEffect, useState } from "react";

function BookForm({ onAddBook, onUpdateBook, editingBook, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [isbn, setIsbn] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
      setGenre(editingBook.genre);
      setIsbn(editingBook.isbn);
      setQuantity(editingBook.quantity);
    }
  }, [editingBook]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title || !author || !genre || !isbn || quantity === "") {
      alert("Please fill in all fields.");
      return;
    }

    if (Number(quantity) < 0) {
      alert("Quantity cannot be negative.");
      return;
    }

    if (editingBook) {
      const updatedBook = {
        ...editingBook,
        title: title,
        author: author,
        genre: genre,
        isbn: isbn,
        quantity: Number(quantity),
      };

      onUpdateBook(updatedBook);
    } else {
      const newBook = {
        id: Date.now(),
        title: title,
        author: author,
        genre: genre,
        isbn: isbn,
        quantity: Number(quantity),
      };

      onAddBook(newBook);
    }

    clearForm();
  };

  const clearForm = () => {
    setTitle("");
    setAuthor("");
    setGenre("");
    setIsbn("");
    setQuantity("");
  };

  const handleCancel = () => {
    clearForm();
    onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingBook ? "Update Book" : "Add New Book"}</h2>

      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>

      <div>
        <label>Author</label>
        <input
          type="text"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
      </div>

      <div>
        <label>Genre</label>
        <input
          type="text"
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
        />
      </div>

      <div>
        <label>ISBN</label>
        <input
          type="text"
          value={isbn}
          onChange={(event) => setIsbn(event.target.value)}
        />
      </div>

      <div>
        <label>Quantity</label>
        <input
          type="number"
          min="0"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
        />
      </div>

      <button type="submit">
        {editingBook ? "Update Book" : "Add Book"}
      </button>

      {editingBook && (
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default BookForm;