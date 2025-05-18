/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import Backpack from "./Backpack";
import AddBackpackButton from "./AddBackpackButton";
import ShowGearInBackpack from "./ShowGearInBackpack";
import useFetchApi from "../hooks/useFetchApi";

export default function Backpacks() {
  const { fetchData, data, loading, error } = useFetchApi();
  const [refreshKey, setRefreshKey] = useState(0);
  const [displayGear, setDisplayGear] = useState(false);
  const [selectedBackpackId, setSelectedBackpackId] = useState(null);

  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  {
    loading && <div>Loading...</div>;
  }

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
        {error && <div>Error received: {error}</div>}
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
        {error && <div>Error received: {error}</div>}
      </>
    );
  }
}
