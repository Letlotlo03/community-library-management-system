import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [membershipId, setMembershipId] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const savedUsers = localStorage.getItem("users");

    const users = savedUsers
      ? JSON.parse(savedUsers)
      : [];

    const user = users.find(
      (currentUser) =>
        currentUser.membershipId.toLowerCase() ===
        membershipId.trim().toLowerCase()
    );

    if (!user) {
      setError("User not found. Please check your Membership ID.");
      return;
    }

    setError("");

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(user)
    );

    navigate("/dashboard");
  };

  return (
    <main>
      <h1>Ha-Abia Community Library by Letlotlo Motsoikha</h1>

      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Membership ID (Enter L1001 as Membership ID to continue)</label>

          <input
            type="text"
            value={membershipId}
            onChange={(event) =>
              setMembershipId(event.target.value)
            }
            placeholder="Enter your Membership ID"
          />
        </div>

        <button type="submit">
          Login
        </button>
      </form>

      {error && (
        <p>{error}</p>
      )}
    </main>
  );
}

export default Login;