import React, { useState } from "react";
import GrabItemModal from "../common/GrabItemModal";

export default function GrabItemButton({ buttonVisible, itemId }) {
  const [modal, setModal] = useState(false);

  return (
    <>
      {buttonVisible && (
        <button className="btn btn-success" onClick={() => setModal(true)}>
          Grab Gear
        </button>
      )}
      <GrabItemModal
        isOpen={modal}
        onClose={() => setModal(false)}
        itemId={itemId}
      />
    </>
  );
}
