import React from "react";
import AdminProfile from "./AdminProfile";
import UserProfile from "./UserProfile";
import useRole from "../hooks/useRole";

export default function ProfileRole() {
  const { role } = useRole();

  return (
    <div className="container">
      {role.includes("ADMIN") ? <AdminProfile /> : <UserProfile />}
    </div>
  );
}
