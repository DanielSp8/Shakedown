import React from "react";
import useRole from "../../hooks/useRole";
export default function UserProfile() {
  const { role } = useRole();

  return (
    <div className="fs-3 drop-some user-fields card border-dark rounded shadow-lg drop-some">
      <div className="card-body">
        <div id="currentRole">Current Role: {role}</div>
      </div>
    </div>
  );
}
