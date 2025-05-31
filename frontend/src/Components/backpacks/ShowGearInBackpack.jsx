/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { formatCurrency } from "../../helpers/currency";
import useFetchApi from "../../hooks/useFetchApi";
import AddGearButton from "../buttons/AddGearButton";
import UpdateGearButton from "../buttons/UpdateGearButton";
import DeleteGearItemButton from "../buttons/DeleteGearItemButton";
import GrabItemButton from "../buttons/GrabItemButton";
import useUsername from "../../hooks/useUsername";
import useRole from "../../hooks/useRole";

export default function ShowGearInBackpack({ backpackId, setDisplayGear }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [buttonVisible, setButtonVisible] = useState(true);
  const { fetchData, data, loading, error } = useFetchApi();
  const { username } = useUsername();
  const { role } = useRole();

  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  useEffect(() => {
    fetchData(`/api/gearlists/gear/${backpackId}`);
  }, [fetchData, backpackId, refreshKey]);

  useEffect(() => {
    if (data && data.length > 0) {
      if (data[0]["ownerUsername"] !== username && !role.includes("ADMIN")) {
        setButtonVisible(false);
      } else {
        setButtonVisible(true);
      }
    }
  }, [data, username, role]);

  if (loading) return <div>Loading...</div>;

  // These calculations give sum totals; for total weight and total price of items
  const totalWeightLbs = Array.isArray(data) // Calculates the total weight of lbs
    ? data.reduce((acc, val) => acc + (val.weightLbs || 0), 0)
    : 0;
  const totalWeightOz = Array.isArray(data) // Calculates the total weight of oz
    ? data.reduce((acc, val) => acc + (val.weightOz || 0), 0)
    : 0;
  const totalOunces = totalWeightLbs * 16 + totalWeightOz; // Converts all weight to ounces:
  const displayLbs = Math.floor(totalOunces / 16);
  const displayOz = (totalOunces % 16).toFixed(2);
  const displayWeight = `${displayLbs} lbs, ${displayOz} oz`;

  const totalPrice = Array.isArray(data)
    ? data.reduce((acc, val) => acc + parseFloat(val.price || 0), 0)
    : 0;

  return (
    <div>
      <AddGearButton
        buttonVisible={buttonVisible}
        backpackId={backpackId}
        onSuccess={triggerRefresh}
      />
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
        {error && (
          <div>
            {error}: There is likely a server error. Please try again...
          </div>
        )}
        <tbody>
          {data?.map((val, key) => {
            // This ternary operator verifies to keep private items private if their
            //  value is true, and the user logged in doesn't have an ADMIN role
            if (
              !val?.privateValue ||
              role.includes("ADMIN") ||
              username === val?.ownerUsername
            ) {
              return (
                <tr key={key}>
                  <td>
                    {val?.ownerUsername === username ||
                    role.includes("ADMIN") ? (
                      <UpdateGearButton
                        itemId={val?.itemId}
                        itemName={val?.itemName}
                        category={val?.category}
                        description={val?.description}
                        weightLbs={val?.weightLbs}
                        weightOz={val?.weightOz}
                        price={val?.price}
                        backpackId={val?.backpackId}
                        privateValue={val?.privateValue}
                        onSuccess={triggerRefresh}
                      />
                    ) : null}
                  </td>
                  <td>{val.itemName}</td>
                  <td>{val.category}</td>
                  <td>{val.description}</td>
                  <td>{val.weightLbs}</td>
                  <td>{val.weightOz}</td>
                  <td>{formatCurrency(val.price)}</td>
                  <td>
                    {val?.ownerUsername === username ||
                    role.includes("ADMIN") ? (
                      <DeleteGearItemButton
                        itemId={val.itemId}
                        itemName={val.itemName}
                        onSuccess={triggerRefresh}
                      />
                    ) : (
                      <GrabItemButton
                        buttonVisible={buttonVisible}
                        itemId={val.itemId}
                      />
                    )}
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">
              <strong>Total Weight and Remaining Cost of Backpack</strong>
            </td>
            <td colSpan="2">
              <strong>{displayWeight}</strong>
            </td>
            <td>
              <strong>{formatCurrency(totalPrice)}</strong>
            </td>
          </tr>
        </tfoot>
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
