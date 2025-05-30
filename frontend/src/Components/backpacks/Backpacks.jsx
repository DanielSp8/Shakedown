/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Backpack from "./Backpack";
import AddBackpackButton from "../buttons/AddBackpackButton";
import ShowGearInBackpack from "./ShowGearInBackpack";

export default function Backpacks() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [displayGear, setDisplayGear] = useState(false);
  const [selectedBackpackId, setSelectedBackpackId] = useState(null);

  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  if (!displayGear) {
    return (
      <>
        <AddBackpackButton onSuccess={triggerRefresh} />
        <Backpack
          setDisplayGear={setDisplayGear}
          setSelectedBackpackId={setSelectedBackpackId}
          refreshKey={refreshKey}
          onSuccess={triggerRefresh}
        />
      </>
    );
  }

  if (displayGear) {
    return (
      <>
        <ShowGearInBackpack
          backpackId={selectedBackpackId}
          setDisplayGear={setDisplayGear}
        />
      </>
    );
  }
}
