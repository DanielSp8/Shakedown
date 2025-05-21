/* eslint-disable react/prop-types */
import React, { useState } from "react";
import RoleModal from "./RoleModal";

export default function DeleteUserButton({
  setShowButton,
  showButton,
  username,
  onSuccess,
}) {
  const [modal, setModal] = useState(false);

  return (
    <>
      <button
        className="btn btn-danger btn-sm"
        style={{ display: showButton ? "inline-block" : "none" }}
        onClick={() => {
          setModal(true);
          setShowButton(false);
        }}
      >
        Delete User
      </button>
      <RoleModal
        isOpen={modal}
        onClose={() => setModal(false)}
        title={`Delete User: ${username}?`}
        url={`/api/users/${username}`}
        method={"DELETE"}
        onSuccess={onSuccess}
        setShowButton={setShowButton}
      />
    </>
  );
}
