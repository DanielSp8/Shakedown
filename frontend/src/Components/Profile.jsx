import { useState, useEffect } from "react";
import AppTitle from "./AppTitle";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    fetchUsername();
  }, []);

  useEffect(() => {
    if (username) {
      fetchRoleOfUser();
    }
  }, [username]);

  // Eventually move this function to its own file,
  //  and pass the props to this component.
  async function fetchUsername() {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("/api/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jsonData = await response.json();
      setUsername(jsonData.username);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  // Eventually move this function to its own file,
  //  and pass the props to this component.
  async function fetchRoleOfUser() {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("/api/profile/roles", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jsonData = await response.json();
      setRole(jsonData[0]);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  const submitNewPassword = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("api/profile/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();
    } catch (err) {
      setError("Network error!");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <AppTitle />
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="card border-dark rounded p-2 shadow-lg half-size-width justify-content-center align-items-center">
          <p className="card-title special-title-with-blue-shadow large-title subTitle text-spacing">
            Profile
          </p>
          <div className="card-body text-center">
            <div className="fs-3 special-title-with-blue-shadow text-spacing">
              Username:{" "}
              <p className="special-text-with-darkblue-shadow">{username}</p>
            </div>
            <div className="fs-3 drop-some special-title-with-blue-shadow text-spacing">
              Role: <p className="special-text-with-darkblue-shadow">{role}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column drop-some justify-content-center align-items-center">
        <form
          className="form-inline mt-3 border border-dark rounded p-4 shadow form-bring-down half-size-width"
          onSubmit={submitNewPassword}
        >
          <label
            htmlFor="inputPassword6"
            className="fs-5 me-2 special-title-with-blue-shadow"
          >
            Change Password:
          </label>
          <div className="d-flex align-items-center drop-some">
            <input
              className="form-control me-2 input-password-box"
              type="password"
              id="inputPassword6"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <button type="submit" className="btn btn-primary button-shadow">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
