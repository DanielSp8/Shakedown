/* eslint-disable react/prop-types */
import React, { useState } from "react";
import useUsername from "../hooks/useUsername";
import RoleModal from "./RoleModal";

export default function ProfileUsername({ onSuccess }) {
  const { username } = useUsername();
  const [modal, setModal] = useState(false);

  return (
    <div className="card border-dark rounded shadow-lg bring-up-some">
      <div className="card-body">
        <div className="fs-3 user-fields">Username: {username}</div>
        <div className="fs-4">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setModal(true)}
          >
            Change Password
          </button>
          <RoleModal
            isOpen={modal}
            onClose={() => setModal(false)}
            title={"Change Password"}
            field={"Enter Password"}
            type={"password"}
            url={`/api/users/${username}/password`}
            method={"PUT"}
            headerContent={"text/plain"}
            onSuccess={onSuccess}
          />
        </div>
      </div>
    </div>
  );
}
