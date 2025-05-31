import React, { useState, useEffect } from "react";
import useFetchApi from "../../hooks/useFetchApi";
import useUsername from "../../hooks/useUsername";
import useRole from "../../hooks/useRole";
import "../../assets/css/card.css";

export default function UserProfile() {
  const { fetchData, data, loading, error } = useFetchApi();
  const [newPassword, setNewPassword] = useState("");
  const { username } = useUsername();
  const { role } = useRole();
  const [message, setMessage] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    if (data) {
      setMessage("Password Successfully Changed.");
      setAlertOpen(true);
    } else if (error) {
      setMessage(`${error} Password Updated failed.  Please try again...`);
      setAlertOpen(true);
    }
  }, [data, error]);

  useEffect(() => {
    if (!alertOpen) return;

    const timer = setTimeout(() => {
      setAlertOpen(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [alertOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `/api/profile/change-password`;
    const method = "PUT";
    const headerContent = "text/plain";
    const body = newPassword;
    fetchData(url, method, headerContent, body);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="card border-dark rounded card-fit card-with-background fixed-card-size">
        <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
          <div className="card-title fs-4">
            <span className="card-texts">Username: {username}</span>
          </div>
          <div className="fs-4">
            <span className="card-texts">Role: {role}</span>
          </div>
          <div className="input-group mb-3 mt-3 card-texts">
            <form onSubmit={handleSubmit} id="passwordFormForUser">
              <input
                type="password"
                className="form-control"
                placeholder="Enter new password"
                aria-label="New Password"
                aria-describedby="button-addon2"
                required
                onChange={(e) => setNewPassword(e.target.value)}
              ></input>
              <button
                className="btn btn-outline-secondary"
                type="submit"
                id="button-addon2"
              >
                Change
              </button>
            </form>
          </div>
        </div>
      </div>
      {alertOpen && <div className="alert alert-success">{message}</div>}
    </div>
  );
}
