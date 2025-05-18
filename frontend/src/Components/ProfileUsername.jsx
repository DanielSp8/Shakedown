import React from "react";
import useUsername from "../hooks/useUsername";

export default function Profile() {
  const { username } = useUsername();

  return (
    <div className="card border-dark rounded shadow-lg bring-up-some">
      <div className="card-body">
        <div className="fs-3 user-fields">Username: {username}</div>
      </div>
    </div>
  );
}
