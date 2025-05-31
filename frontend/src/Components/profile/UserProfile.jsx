import React, { useState, useEffect } from "react";
import useFetchApi from "../../hooks/useFetchApi";
import AlertBox from "../common/AlertBox";
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

  const submitNewPassword = () => {
    const url = `/api/profile/change-password`;
    const method = "PUT";
    const headerContent = "application/text";
    const body = newPassword;
    fetchData(url, method, headerContent, body);
    if (!error && data) {
      setMessage("Password Successfully Changed.");
    } else {
      setMessage(`${error} Password Updated failed.  Please try again...`);
    }
    setAlertOpen(true);
  };

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
          <div className="input-group mb-3 mt-3 card-texts form">
            <input
              type="password"
              className="form-control"
              placeholder="Enter new password"
              aria-label="New Password"
              aria-describedby="button-addon2"
              onChange={(e) => setNewPassword(e.target.value)}
            ></input>
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={submitNewPassword}
            >
              Change
            </button>
          </div>
        </div>
      </div>
      {alertOpen && (
        <AlertBox
          alertOpen={alertOpen}
          setAlertOpen={setAlertOpen}
          message={message}
        />
      )}
    </div>
  );
}
