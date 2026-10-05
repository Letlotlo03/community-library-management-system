import { useEffect, useState } from "react";

import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";

function Users() {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");

    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const addUser = (newUser) => {
    setUsers((currentUsers) => [
      ...currentUsers,
      newUser,
    ]);
  };

  const updateUser = (updatedUser) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === updatedUser.id
          ? updatedUser
          : user
      )
    );

    setEditingUser(null);
  };

  const deleteUser = (userId) => {
    setUsers((currentUsers) =>
      currentUsers.filter((user) => user.id !== userId)
    );
  };

  const editUser = (user) => {
    setEditingUser(user);
  };

  const cancelEdit = () => {
    setEditingUser(null);
  };

  return (
    <main>
      <h1>User Management</h1>

      <UserForm
        onAddUser={addUser}
        onUpdateUser={updateUser}
        editingUser={editingUser}
        onCancelEdit={cancelEdit}
      />

      <UserTable
        users={users}
        onEditUser={editUser}
        onDeleteUser={deleteUser}
      />
    </main>
  );
}

export default Users;