/* eslint-disable react/prop-types */
import React, { useState } from "react";
import RoleModal from "./RoleModal";

export default function DeleteRoleButton({ username, role, onSuccess }) {
  const [modal, setModal] = useState(false);

  return (
    <>
      <button className="btn btn-danger" onClick={() => setModal(true)}>
        Delete Role
      </button>
      <RoleModal
        isOpen={modal}
        onClose={() => setModal(false)}
        username={username}
        role={role}
        title={"Delete Role"}
        url={`/api/users/${username}/roles/${role}`}
        method={"DELETE"}
        onSuccess={onSuccess}
      />
    </>
  );
}
