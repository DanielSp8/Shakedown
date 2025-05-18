/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import useFetchApi from "../hooks/useFetchApi";
import DeleteBackpackButton from "./DeleteBackpackButton";
import useUsername from "../hooks/useUsername";
import useRole from "../hooks/useRole";

export default function Backpack({
  setDisplayGear,
  setSelectedBackpackId,
  refreshKey,
  onSuccess,
}) {
  const { fetchData, data, loading, error } = useFetchApi();
  const { username } = useUsername();
  const { role } = useRole();

  useEffect(() => {
    fetchData(`/api/backpacks`);
  }, [fetchData, refreshKey]);

  if (loading) return <div>Loading...</div>;

  const handleShowGearClick = (backpackId) => {
    setSelectedBackpackId(backpackId);
    setDisplayGear(true);
  };
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Backpack Name</th>
            <th scope="col">Location</th>
            <th scope="col">User</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((val, key) => {
            // This ternary operator verifies to keep private items private if they're
            //  true, and the user logged in doesn't have an ADMIN role
            if (
              !val?.privateValue ||
              role.includes("ADMIN") ||
              username === val?.ownerUsername
            ) {
              return (
                <tr key={key}>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => handleShowGearClick(val?.backpackId)}
                    >
                      Show Gear
                    </button>
                  </td>
                  <td>{val?.backpackName}</td>
                  <td>{val?.location}</td>
                  <td>{val?.ownerUsername}</td>
                  <td>
                    <DeleteBackpackButton
                      backpackName={val?.backpackName}
                      backpackId={val?.backpackId}
                      onSuccess={onSuccess}
                    />
                  </td>
                </tr>
              );
            }

            return null;
          })}
          {error && <div>Error: {error}. Please try again...</div>}
        </tbody>
      </table>
    </div>
  );
}
