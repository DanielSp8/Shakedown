/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Modal from "../common/Modal";

export default function DeleteGearItemButton({ itemId, itemName, onSuccess }) {
  const [modal, setModal] = useState(false);

  return (
    <>
      <button className="btn btn-danger" onClick={() => setModal(true)}>
        Delete Item
      </button>

      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        title={`Remove item ${itemName} from backpack?`}
        url={`/api/gearlists/${itemId}`}
        method={"DELETE"}
        onSuccess={onSuccess}
      />
    </>
  );
}
