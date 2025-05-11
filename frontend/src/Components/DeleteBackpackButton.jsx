/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Modal from "./ConfirmDeleteModal";

export default function DeleteBackpackButton({
  backpackName,
  backpackId,
  onSuccess,
}) {
  const [modal, setModal] = useState(false);

  return (
    <>
      <button className="btn btn-danger" onClick={() => setModal(true)}>
        Delete Backpack
      </button>
      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        title={`Remove backpack ${backpackName}?`}
        url={`/api/backpacks/${backpackId}`}
        method={"DELETE"}
        onSuccess={onSuccess}
      />
    </>
  );
}
