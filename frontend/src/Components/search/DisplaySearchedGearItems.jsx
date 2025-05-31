/* eslint-disable react/prop-types */
import React from "react";
import { formatCurrency } from "../../helpers/currency";
import useUsername from "../../hooks/useUsername";
import useRole from "../../hooks/useRole";

export default function DisplaySearchedGearItems({ data, displayTable }) {
  const { username } = useUsername();
  const { role } = useRole();

  if (displayTable)
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Category</th>
              <th scope="col">Description</th>
              <th scope="col">Weight (in lbs)</th>
              <th scope="col">Weight (in oz)</th>
              <th scope="col">Price</th>
              <th scope="col">Private?</th>
              <th scope="col">Username</th>
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
                    <td>{val.itemName}</td>
                    <td>{val.category}</td>
                    <td>{val.description}</td>
                    <td>{val.weightLbs}</td>
                    <td>{val.weightOz}</td>
                    <td>{formatCurrency(val.price)}</td>
                    <td>{val.privateValue ? "true" : "false"}</td>
                    <td>{val.ownerUsername}</td>
                  </tr>
                );
              }
            })}
            <tr>
              <td>
                <strong>Total Items Found: {data?.length}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
}
