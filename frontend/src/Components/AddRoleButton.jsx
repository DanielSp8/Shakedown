/* eslint-disable react/prop-types */
import React, { useState } from "react";
import RoleModal from "./RoleModal";

export default function AddRoleButton({ username, onSuccess }) {
  const [modal, setModal] = useState(false);

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => {
          setModal(true);
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
        onSuccess={onSuccess}
      />
    </>
  );
}
