import React from "react";
import AppTitle from "../common/AppTitle";
import AdminProfile from "./AdminProfile";
import UserProfile from "./UserProfile";
import useRole from "../../hooks/useRole";

export default function Profile() {
  const { role } = useRole();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <AppTitle />
      {role.includes("ADMIN") ? <AdminProfile /> : <UserProfile />}
    </div>
  );
}
