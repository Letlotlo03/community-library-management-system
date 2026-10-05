function TransactionForm({
  books,
  selectedBookId,
  setSelectedBookId,
  quantity,
  setQuantity,
  onAddStock,
  onBorrowBook,
}) {
  return (
    <div>
      <h2>Manage Stock</h2>

      <div>
        <label>Select Book</label>

        <select
          value={selectedBookId}
          onChange={(event) => setSelectedBookId(event.target.value)}
        >
          <option value="">-- Select a book --</option>

          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title} ({book.quantity} available)
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Quantity</label>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
        />
      </div>

      <button type="button" onClick={onAddStock}>
        Add Stock
      </button>

      <button type="button" onClick={onBorrowBook}>
        Borrow Book
      </button>
    </div>
  );
}

export default TransactionForm;