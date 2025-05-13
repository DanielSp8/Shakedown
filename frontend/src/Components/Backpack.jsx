/* eslint-disable react/prop-types */
import { useEffect } from "react";
import useFetchApi from "../hooks/useFetchApi";
import DeleteBackpackButton from "./DeleteBackpackButton";

export default function Backpack({
  setDisplayGear,
  setSelectedBackpackId,
  refreshKey,
  onSuccess,
}) {
  const { fetchData, data, loading, error } = useFetchApi();

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
          })}
        </tbody>
      </table>
      {error && <div>{error}: Please try again</div>}
    </div>
  );
}
