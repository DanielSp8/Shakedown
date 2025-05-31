import React, { useState, useEffect } from "react";
import useFetchApi from "../../hooks/useFetchApi";
import useRole from "../../hooks/useRole";
import { userRoles } from "../../helpers/userRoles";

// Add refresh functionality -- for updating the profile page.
export default function DropdownRole({ usernameForRoles }) {
  const { fetchData, data, loading, error } = useFetchApi();
  const [selectedValue, setSelectedValue] = useState("");
  const { role } = useRole();

  const handleSelect = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    fetchData(`/api/users/${usernameForRoles}/roles`, "GET");
  }, [fetchData, usernameForRoles]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="mb-3">
      <label htmlFor="dropdownRole">Select Role:</label>
      <select
        id="dropdownRole"
        value={selectedValue}
        onChange={handleSelect}
        className="form-select"
      >
        {userRoles.map((userRole) => (
          <option key={userRole} value={userRole}>
            {userRole}
          </option>
        ))}
      </select>
    </div>
  );
}
