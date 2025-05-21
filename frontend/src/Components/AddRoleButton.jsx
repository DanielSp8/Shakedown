/* eslint-disable react/prop-types */
import React, { useState } from "react";
import RoleModal from "./RoleModal";

export default function AddRoleButton({
  showButton,
  setShowButton,
  username,
  onSuccess,
}) {
  const [modal, setModal] = useState(false);

  return (
    <>
      <button
        className="btn btn-primary btn-sm"
        style={{ display: showButton ? "inline-block" : "none" }}
        onClick={() => {
          setModal(true);
          setShowButton(false);
        }}
      >
        Add Role
      </button>
      <RoleModal
        isOpen={modal}
        onClose={() => setModal(false)}
        title={`Add Role to ${username}`}
        field={"Add Role"}
        url={`/api/users/${username}/roles`}
        method={"POST"}
        headerContent={"text/plain"}
        onSuccess={onSuccess}
        setShowButton={setShowButton}
      />
    </>
  );
}
