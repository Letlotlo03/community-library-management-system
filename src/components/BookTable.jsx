function BookTable({ books, onDeleteBook, onEditBook }) {
  return (
    <div>
      <h2>Book List</h2>

      {books.length === 0 ? (
        <p>No books have been added yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>ISBN</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.isbn}</td>
                <td>{book.quantity}</td>

                <td>
                  <button onClick={() => onEditBook(book)}>
                    Edit
                  </button>

                  <button onClick={() => onDeleteBook(book.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BookTable;