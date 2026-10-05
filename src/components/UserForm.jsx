import { useEffect, useState } from "react";

function UserForm({
  onAddUser,
  onUpdateUser,
  editingUser,
  onCancelEdit,
}) {
  const [name, setName] = useState("");
  const [membershipId, setMembershipId] = useState("");
  const [role, setRole] = useState("Member");

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setMembershipId(editingUser.membershipId);
      setRole(editingUser.role);
    }
  }, [editingUser]);

  const clearForm = () => {
    setName("");
    setMembershipId("");
    setRole("Member");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || !membershipId || !role) {
      alert("Please fill in all fields.");
      return;
    }

    if (editingUser) {
      onUpdateUser({
        ...editingUser,
        name,
        membershipId,
        role,
      });
    } else {
      onAddUser({
        id: Date.now(),
        name,
        membershipId,
        role,
      });
    }

    clearForm();
  };

  const handleCancel = () => {
    clearForm();
    onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingUser ? "Update User" : "Add New User"}</h2>

      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div>
        <label>Membership ID</label>
        <input
          type="text"
          value={membershipId}
          onChange={(event) =>
            setMembershipId(event.target.value)
          }
        />
      </div>

      <div>
        <label>Role</label>

        <select
          value={role}
          onChange={(event) => setRole(event.target.value)}
        >
          <option value="Member">Member</option>
          <option value="Librarian">Librarian</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      <button type="submit">
        {editingUser ? "Update User" : "Add User"}
      </button>

      {editingUser && (
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default UserForm;