import { useState } from "react";
import Backpack from "./Backpack";
import ShowGearInBackpack from "./ShowGearInBackpack";

export default function Backpacks() {
  const [displayGear, setDisplayGear] = useState(false);
  const [selectedBackpackId, setSelectedBackpackId] = useState(null);

  if (!displayGear) {
    return (
      <>
        <Backpack
          setDisplayGear={setDisplayGear}
          setSelectedBackpackId={setSelectedBackpackId}
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
