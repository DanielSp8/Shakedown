/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { formatCurrency } from "../helpers/currency";
import useFetchApi from "../hooks/useFetchApi";
import AddGearButton from "./AddGearButton";
import UpdateGearButton from "./UpdateGearButton";
import DeleteGearItemButton from "./DeleteGearItemButton";

export default function ShowGearInBackpack({ backpackId, setDisplayGear }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const { fetchData, data, loading, error } = useFetchApi();

  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  useEffect(() => {
    fetchData(`/api/gearlists/gear/${backpackId}`);
  }, [fetchData, backpackId, refreshKey]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  const totalWeightLbs = Array.isArray(data)
    ? data.reduce((acc, val) => acc + (val.weightLbs || 0), 0)
    : 0;
  const totalWeightOz = Array.isArray(data)
    ? data.reduce((acc, val) => acc + (val.weightOz || 0), 0)
    : 0;
  const totalPrice = Array.isArray(data)
    ? data.reduce((acc, val) => acc + parseFloat(val.price || 0), 0)
    : 0;

  const totalWeightInPounds = totalWeightLbs + totalWeightOz / 16;

  return (
    <div>
      <AddGearButton backpackId={backpackId} onSuccess={triggerRefresh} />
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
          {data?.map((val, key) => {
            return (
              <tr key={key}>
                <td>
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
                </td>
                <td>{val.itemName}</td>
                <td>{val.category}</td>
                <td>{val.description}</td>
                <td>{val.weightLbs}</td>
                <td>{val.weightOz}</td>
                <td>{formatCurrency(val.price)}</td>
                <td>
                  <DeleteGearItemButton
                    itemId={val.itemId}
                    itemName={val.itemName}
                    onSuccess={triggerRefresh}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">
              <strong>Total Weight and Remaining Cost of Backpack</strong>
            </td>
            <td colSpan="2">
              <strong>{totalWeightInPounds.toFixed(2)} lbs</strong>
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
