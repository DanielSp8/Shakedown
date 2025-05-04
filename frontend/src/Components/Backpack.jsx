import { useEffect, useState } from "react";

export default function Backpack() {
  const [loading, setLoading] = useState(true);
  const [backpacks, setBackpacks] = useState([{}]);
  const [error, setError] = useState(null);
  const [displayGear, setDisplayGear] = useState(false);
  const [gearList, setGearList] = useState([{}]);

  async function displayGearList(backpackId) {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/gearlists/gear/${backpackId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error getting the gear list!  ${response.status}`);
      }
      const data = await response.json();
      setGearList(data);
      setDisplayGear(true);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

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
      setBackpacks(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!displayGear) {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Backpack Name</th>
              <th>Location</th>
              <th>User</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {backpacks.map((val, key) => {
              return (
                <tr key={key}>
                  <td>
                    <button onClick={() => displayGearList(val.backpackId)}>
                      Show Gear
                    </button>
                  </td>
                  <td>{val.backpackName}</td>
                  <td>{val.location}</td>
                  <td>{val.ownerUsername}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else if (displayGear) {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Item</th>
              <th>Category</th>
              <th>Description</th>
              <th>Weight (in lbs)</th>
              <th>Weight (in oz)</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {gearList.map((val, key) => {
              return (
                <tr key={key}>
                  <td>
                    <button type="button" className="btn btn-info">
                      Update
                    </button>
                  </td>
                  <td>{val.itemName}</td>
                  <td>{val.category}</td>
                  <td>{val.description}</td>
                  <td>{val.weightLbs}</td>
                  <td>{val.weightOz}</td>
                  <td>{val.price}</td>
                  <td>
                    <button type="button" className="btn btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button
          id="backpacksButton"
          className="btn btn-primary"
          onClick={() => setDisplayGear(false)}
        >
          Back to Backpacks
        </button>
      </div>
    );
  }
}
