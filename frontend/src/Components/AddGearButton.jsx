/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Modal from "./Modal";

export default function AddGearButton({ backpackId, onSuccess }) {
  const [modal, setModal] = useState(false);

  return (
    <>
      <button className="btn btn-success" onClick={() => setModal(true)}>
        Add Gear
      </button>
      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        title={"Add Gear"}
        backpackId={backpackId}
        fields={[
          "itemName",
          "category",
          "description",
          "weightLbs",
          "weightOz",
          "price",
          "privateValue",
        ]}
        url={"/api/gearlists/add"}
        method={"POST"}
        onSuccess={onSuccess}
      />
    </>
  );
}
