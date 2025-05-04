import { useEffect, useState } from "react";

export default function Backpack() {
  const [loading, setLoading] = useState(true);
  const [backpacks, setBackpacks] = useState([{}]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBackpacksByAdminRole();
  }, []);

  async function fetchBackpacksByAdminRole() {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("/api/backpacks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error!  Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data[0]);
      setBackpacks(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <table>
        <tr>
          <th>BackpackId</th>
          <th>Name of Backpack</th>
          <th>Location</th>
          <th>User</th>
          <th>Private?</th>
        </tr>
        {backpacks.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.backpackId}</td>
              <td>{val.backpackName}</td>
              <td>{val.location}</td>
              <td>{val.ownerUsername}</td>
              <td>{val.privateValue ? "true" : "false"}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
