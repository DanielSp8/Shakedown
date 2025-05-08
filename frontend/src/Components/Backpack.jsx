import { useEffect, useState } from "react";
import { formatCurrency } from "../helpers/currency";

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
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Item</th>
              <th scope="col">Category</th>
              <th scope="col">Description</th>
              <th scope="col">Weight (in lbs)</th>
              <th scope="col">Weight (in oz)</th>
              <th scope="col">Price</th>
              <th scope="col"></th>
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
                  <td>{formatCurrency(val.price)}</td>
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
