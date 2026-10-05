function UserTable({ users, onEditUser, onDeleteUser }) {
  return (
    <div>
      <h2>User List</h2>

      {users.length === 0 ? (
        <p>No users have been added yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Membership ID</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.membershipId}</td>
                <td>{user.role}</td>

                <td>
                  <button onClick={() => onEditUser(user)}>
                    Edit
                  </button>

                  <button
                    onClick={() => onDeleteUser(user.id)}
                  >
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

export default UserTable;