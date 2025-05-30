import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
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
      setError("Network error.  Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label" htmlFor="username">
          Username
        </label>
        <input
          className="form-control"
          id="username"
          type="text"
          value={username}
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
          Login
        </button>
      </div>

      {error && <p className="error-message mt-5">{error}</p>}
    </form>
  );
}
