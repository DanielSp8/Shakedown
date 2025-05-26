/* eslint-disable react/prop-types */
import React, { useState } from "react";
import RoleModal from "./RoleModal";

export default function ChangeOtherPasswordButton({
  otherUsername,
  onSuccess,
}) {
  const [modal, setModal] = useState(false);

  return (
    <>
      <button className="btn btn-info btn-sm" onClick={() => setModal(true)}>
        Change Password
      </button>
      <RoleModal
        isOpen={modal}
        onClose={() => setModal(false)}
        title={"Change Password"}
        field={"Enter Password"}
        type={"password"}
        url={`/api/users/${otherUsername}/password`}
        method={"PUT"}
        headerContent={"text/plain"}
        onSuccess={onSuccess}
      />
    </>
  );
}
