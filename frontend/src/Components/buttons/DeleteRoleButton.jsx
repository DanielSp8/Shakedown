/* eslint-disable react/prop-types */
import React, { useState } from "react";
import RoleModal from "../common/RoleModal";

export default function DeleteRoleButton({ otherUsername, role, onSuccess }) {
  const [modal, setModal] = useState(false);

  return (
    <>
      <button
        className="btn btn-danger btn-sm m-2"
        onClick={() => setModal(true)}
      >
        Delete Role
      </button>
      <RoleModal
        isOpen={modal}
        onClose={() => setModal(false)}
        username={otherUsername}
        role={role}
        title={"Delete Role"}
        url={`/api/users/${otherUsername}/roles/${role}`}
        method={"DELETE"}
        onSuccess={onSuccess}
      />
    </>
  );
}
