/* eslint-disable react/prop-types */
import React, { useState } from "react";
import RoleModal from "../common/RoleModal";

export default function AddRoleButton({
  showButton,
  setShowButton,
  otherUsername,
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
        title={`Add Role to ${otherUsername}`}
        field={"Add Role"}
        url={`/api/users/${otherUsername}/roles`}
        method={"POST"}
        headerContent={"text/plain"}
        onSuccess={onSuccess}
        setShowButton={setShowButton}
      />
    </>
  );
}
