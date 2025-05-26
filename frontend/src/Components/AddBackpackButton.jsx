/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Modal from "./Modal";

export default function AddBackpackButton({ onSuccess }) {
  const [modal, setModal] = useState(false);

  return (
    <>
      <button className="btn btn-success" onClick={() => setModal(true)}>
        Add Backpack
      </button>
      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        title={"Add Backpack"}
        fields={["backpackName", "location", "privateValue"]}
        url={"/api/backpacks/add"}
        method={"POST"}
        onSuccess={onSuccess}
      />
    </>
  );
}
