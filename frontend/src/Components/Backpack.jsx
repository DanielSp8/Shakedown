/* eslint-disable react/prop-types */
import { useEffect } from "react";
import useFetchApi from "../hooks/useFetchApi";

export default function Backpack({ setDisplayGear, setSelectedBackpackId }) {
  const { fetchData, data, loading, error } = useFetchApi();

  useEffect(() => {
    fetchData(`/api/backpacks`);
  }, [fetchData]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

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
                  <button onClick={() => handleShowGearClick(val?.backpackId)}>
                    Show Gear
                  </button>
                </td>
                <td>{val?.backpackName}</td>
                <td>{val?.location}</td>
                <td>{val?.ownerUsername}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
