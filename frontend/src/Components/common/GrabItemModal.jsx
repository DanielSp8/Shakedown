/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import useFetchAPi from "../../hooks/useFetchApi";
import useUsername from "../../hooks/useUsername";
import useBackpacksOfUser from "../../hooks/useBackpacksOfUser";

// Add onSuccess functionality below...
export default function GrabItemModal({ isOpen, onClose, itemId, onSuccess }) {
  const { fetchData, data, loading, error } = useFetchAPi();
  const [gearData, setGearData] = useState({ privateValue: false });
  const [selectedValue, setSelectedValue] = useState(
    backpacks.length > 0 ? backpacks[0].backpackId : ""
  );
  const { backpacks } = useBackpacksOfUser();
  const { username } = useUsername();

  const clearAndClose = () => {
    setGearData({});
    setSelectedValue("");
    onClose();
  };

  // This function is activated when the user clicks the grab gear button.
  // It will be used to grab the data from the itemId of the gear, and insert it into
  //  the specific backpack selected.
  const onGrabGearClick = () => {
    // fetchData(`/api/gearlists/${itemId}`);
    // if (data)
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  if (!isOpen) return null;

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Sorry, error received: {error}</div>;

  if (backpacks.length === 0) {
    return (
      <div>
        {username}, you do not have any backpacks created. Go to the backpacks
        menu, and create a backpack...
      </div>
    );
  } else if (backpacks.length > 0) {
    return (
      <>
        <div className="modal-overlay">
          <div className="modal-content border border-dark rounded shadow p-4">
            <label className="modal-title">Grab Gear!</label>
            <select
              id="backpackSelect"
              value={selectedValue}
              onChange={handleChange}
            >
              {backpacks.map((backpack) => (
                <option key={backpack.backpackId} value={backpack.backpackId}>
                  {backpack.backpackName}
                </option>
              ))}
            </select>
            <p>Selected Value: {selectedValue}</p>
            <p>
              Add {itemId} to {selectedValue}?
            </p>
            {/* This button will be used to insert the gear into the specific backpack: */}
            <button className="btn btn-primary w-20">Grab Gear</button>
            <button className="btn btn-secondary w-20" onClick={clearAndClose}>
              Cancel
            </button>
          </div>
        </div>
      </>
    );
  }
}
