import { useEffect, useState } from "react";

function Dashboard() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const savedBooks = localStorage.getItem("books");

    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }
  }, []);

  const totalTitles = books.length;

  const totalCopies = books.reduce(
    (total, book) => total + book.quantity,
    0
  );

  const lowStockBooks = books.filter(
    (book) => book.quantity < 2
  );

  return (
    <main>
      <h1>Library Dashboard</h1>

      <p>
        Welcome to the Community Library Management System.
      </p>

<div className="dashboard-cards">

  <div className="stat-card">
    <h2>Total Book Titles</h2>
    <p>{totalTitles}</p>
  </div>

  <div className="stat-card">
    <h2>Total Available Copies</h2>
    <p>{totalCopies}</p>
  </div>

  <div className="stat-card">
    <h2>Low Stock Books</h2>
    <p>{lowStockBooks.length}</p>
  </div>

</div>

      <h2>Current Book Availability</h2>

      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>ISBN</th>
              <th>Available Quantity</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
                <tr
                    key={book.id}
                    style={
                        book.quantity < 2
                            ? { backgroundColor: "#fee2e2", color: "#991b1b" }
                            : {}
                        }
                    >
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.isbn}</td>
                <td>
                    {book.quantity}

                    {book.quantity < 2 && (
                        <strong> - LOW STOCK</strong>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}

export default Dashboard;