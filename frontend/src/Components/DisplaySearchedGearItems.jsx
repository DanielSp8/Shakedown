/* eslint-disable react/prop-types */
import React from "react";
import { formatCurrency } from "../helpers/currency";

export default function DisplaySearchedGearItems({ data }) {
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
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.itemName}</td>
                <td>{val.category}</td>
                <td>{val.description}</td>
                <td>{val.weightLbs}</td>
                <td>{val.weightOz}</td>
                <td>{formatCurrency(val.price)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
