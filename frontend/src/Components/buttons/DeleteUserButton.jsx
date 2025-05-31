/* eslint-disable react/prop-types */
import React, { useState } from "react";
import RoleModal from "../common/RoleModal";

export default function DeleteUserButton({
  setShowButton,
  showButton,
  otherUsername,
  onSuccess,
}) {
  const [modal, setModal] = useState(false);

  return (
    <div className="mt-5">
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
        title={`Delete User: ${otherUsername}?`}
        url={`/api/users/${otherUsername}`}
        method={"DELETE"}
        onSuccess={onSuccess}
        setShowButton={setShowButton}
      />
    </div>
  );
}
