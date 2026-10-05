function TransactionHistory({ transactions }) {
  return (
    <div>
      <h2>Transaction History</h2>

      {transactions.length === 0 ? (
        <p>No transactions recorded yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Book</th>
              <th>Action</th>
              <th>Quantity</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.bookTitle}</td>
                <td>{transaction.action}</td>
                <td>{transaction.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TransactionHistory;