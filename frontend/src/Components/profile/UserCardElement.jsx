import React, { useState, useEffect } from "react";
import useFetchApi from "../../hooks/useFetchApi";
import useUsername from "../../hooks/useUsername";
import DeleteUserButton from "../buttons/DeleteUserButton";
import useUserRoles from "../../hooks/useUserRoles";
import "../../assets/css/card.css";
import { isRouteErrorResponse } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function UserCardElement({ otherUsername, onSuccess }) {
  const { fetchData, data, loading, error } = useFetchApi();
  const { username } = useUsername();
  const [showButton, setShowButton] = useState(true);
  const [message, setMessage] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const { roles } = useUserRoles({ otherUsername });

  const verifyLoggedInUsername = (usernameToCheck) => {
    if (username === usernameToCheck) {
      return "Logged in Username:";
    } else {
      return "Username:";
    }
  };

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
    let url = "";
    if (username === otherUsername) {
      url = `/api/profile/change-password`;
    } else {
      url = `/api/{otherUsername)/password`;
    }
    const method = "PUT";
    const headerContent = "text/plain";
    const body = newPassword;
    fetchData(url, method, headerContent, body);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="card-texts">{verifyLoggedInUsername(otherUsername)}</div>
      <div className="card-texts">{otherUsername}</div>
      <div className="card-texts">Current Role: {roles}</div>
      {username !== otherUsername ? (
        <>
          <div className="input-group mb-3 mt-3 card-texts">
            <form onSubmit={handleSubmit} id={`${otherUsername}-id`}>
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
                Change Password
              </button>
            </form>
          </div>
          <DeleteUserButton
            setShowButton={setShowButton}
            showButton={showButton}
            otherUsername={otherUsername}
            onSuccess={onSuccess}
          />
        </>
      ) : (
        <div className="input-group mb-3 mt-5 card-texts">
          <form onSubmit={handleSubmit} id={`${username}-id`}>
            <input
              type="password"
              className="form-control"
              placeholder="Enter new password"
              aria-label="New Password"
              aria-describedby="button-addon3"
              required
              onChange={(e) => setNewPassword(e.target.value)}
            ></input>
            <button
              className="btn btn-outline-secondary"
              type="submit"
              id="button-addon3"
            >
              Change Password
            </button>
          </form>
        </div>
      )}
      {alertOpen && <div className="alert alert-success">{message}</div>}
    </div>
  );
}
