/* eslint-disable react/prop-types */
import React from "react";
import useFetchApi from "../hooks/useFetchApi";

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  title,
  url,
  method,
  onSuccess,
}) {
  const { fetchData, data, loading, error } = useFetchApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchData(url, method);

    console.log("Error:", error);
    console.log(typeof onSuccess);
    if (!error) {
      if (typeof onSuccess === "function") {
        onSuccess();
      }
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content border border-dark rounded shadow p-4">
        <label className="modal-title">{title}</label>
        <div className="d-flex justify-content-between mt-3">
          <button
            className="btn btn-danger w-20 me-2"
            disabled={loading}
            onClick={handleSubmit}
          >
            Delete
          </button>
          {error && <p className="text-danger">{error}</p>}
          <button className="btn btn-secondary w-20 me-2" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
