import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const loginNewUser = async () => {
    try {
      const response = await fetch("auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok && data.accessToken.token) {
        localStorage.setItem("token", data.accessToken.token);
        navigate("/dashboard/home");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error.  Please try again.");
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setUsername("");
        setPassword("");
        setError(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      if (!response.ok) throw new Error("Registration failed.");

      const data = await response.json();
      console.log("data:", data);
      if (response.ok && data) {
        loginNewUser();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <div className="mb-3">
        <label className="form-label" htmlFor="username">
          Username
        </label>
        <input
          className="form-control"
          id="username"
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <label className="form-label" htmlFor="password">
        Password
      </label>
      <input
        className="form-control"
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className="d-grid mt-3">
        <button className="btn btn-primary" type="submit">
          Create Account
        </button>
      </div>
      {error && <p className="error-message mt-5">{error}</p>}
    </form>
  );
}
