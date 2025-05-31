/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import useFetchAPi from "../../hooks/useFetchApi";
import useUsername from "../../hooks/useUsername";
import useBackpacksOfUser from "../../hooks/useBackpacksOfUser";
import useGrabGearItemInfo from "../../hooks/useGrabGearItemInfo";

// Add onSuccess functionality below...
export default function GrabItemModal({ isOpen, onClose, itemId, onSuccess }) {
  const { fetchData, data, loading, error } = useFetchAPi();
  const [selectedValue, setSelectedValue] = useState(0);
  const { backpacks } = useBackpacksOfUser();
  const { username } = useUsername();
  const { gearItem } = useGrabGearItemInfo(itemId);

  const clearAndClose = () => {
    setSelectedValue("");
    onClose();
  };

  useEffect(() => {
    if (backpacks && backpacks.length > 0) {
      setSelectedValue(backpacks[0].backpackId);
    }
  }, [backpacks]);

  const onGrabGearClick = async () => {
    // This removes the itemId field from the object, so that it will add it
    //  to the backpack correctly.
    const { itemId, ...gearItemWithoutItemId } = gearItem;

    const movingGearData = {
      ...gearItemWithoutItemId,
      ownerUsername: username,
      backpackId: parseInt(selectedValue, 10),
    };

    console.log(movingGearData);
    const url = `/api/gearlists/add`;
    const method = "POST";

    await fetchData(url, method, "application/json", movingGearData);

    clearAndClose();
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
            <p>
              Which backpack of yours would you like to place this item:{" "}
              {gearItem?.itemName} in?
            </p>
            <span>
              <strong>Backpacks:</strong>
            </span>
            <select
              id="backpackSelect"
              value={selectedValue}
              onChange={handleChange}
            >
              {backpacks.map((backpack) => (
                <option key={backpack.backpackId} value={backpack.backpackId}>
                  {backpack.backpackName} - {backpack.location}
                </option>
              ))}
            </select>
            <p>Selected Value: {selectedValue}</p>
            <p>
              Add {gearItem?.itemName} to {selectedValue}?
            </p>
            {/* This button will be used to insert the gear into the specific backpack: */}
            <button className="btn btn-primary w-20" onClick={onGrabGearClick}>
              Grab Gear
            </button>
            <button className="btn btn-secondary w-20" onClick={clearAndClose}>
              Cancel
            </button>
          </div>
        </div>
      </>
    );
  }
}
