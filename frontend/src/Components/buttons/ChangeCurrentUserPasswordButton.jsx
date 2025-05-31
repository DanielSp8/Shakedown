import React, { useState, useEffect } from "react";
import useFetchApi from "../../hooks/useFetchApi";
import useUsername from "../../hooks/useUsername";
import AlertBox from "../common/AlertBox";

export default function ChangeCurrentUserPasswordButton({ otherUsername }) {
  const { fetchData, data, loading, error } = useFetchApi();
  const { username } = useUsername();
  const [buttonTitle, setButtonTitle] = useState("Update Password");
  const [newPassword, setNewPassword] = useState("");
  const [inputVisible, setInputVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [messageResponse, setMessageResponse] = useState(null);

  const handleShowAlert = () => {
    showAlert(true);
  };

  const handleCloseAlert = () => {
    setMessageResponse(null);
    showAlert(false);
  };

  const verifyUser = () => {
    let url = "";
    if (otherUsername === username) {
      url = `/api/profile/change-password`;
    } else {
      url = `/api/users/${otherUsername}/password`;
    }
    changeThePassword(url);
  };

  const changeThePassword = (url) => {
    const method = "PUT";
    const headerContent = "application/text";
    const body = newPassword;

    fetchData(url, method, headerContent, body);
    console.log(data);
  };

  const changePasswordOnClick = () => {
    if (buttonTitle === "Update Password") {
      setInputVisible(true);
      setButtonTitle("Change Password");
    } else {
      verifyUser();
      setInputVisible(false);
    }
  };

  return (
    <>
      <button className="btn btn-info btn-sm" onClick={changePasswordOnClick}>
        {buttonTitle}
      </button>
      {inputVisible && (
        <input
          type="password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
          className="passwordInput"
          placeholder="Enter new password"
          required
        />
      )}
    </>
  );
}
