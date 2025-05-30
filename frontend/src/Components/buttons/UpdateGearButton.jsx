/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Modal from "../common/Modal";

export default function UpdateGearButton({ itemId, backpackId, onSuccess }) {
  const [modal, setModal] = useState(false);

  return (
    <>
      <button className="btn btn-success" onClick={() => setModal(true)}>
        Edit Gear
      </button>

      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        title={"Edit Gear Item"}
        backpackId={backpackId}
        itemId={itemId}
        fields={[
          "itemName",
          "category",
          "description",
          "weightLbs",
          "weightOz",
          "price",
          "privateValue",
        ]}
        url={`/api/gearlists/update`}
        method={"PUT"}
        onSuccess={onSuccess}
      />
    </>
  );
}
