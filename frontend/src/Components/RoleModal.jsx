/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import useFetchApi from "../hooks/useFetchApi";

export default function RoleModal({
  isOpen,
  onClose,
  username,
  role,
  title,
  field = null,
  url,
  method,
  headerContent = null,
  onSuccess,
  setShowButton,
}) {
  const { fetchData, data, loading, error } = useFetchApi();
  const [input, setInput] = useState("");

  const clearAndClose = () => {
    setInput("");
    setShowButton(true);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (method === "POST" && field === "Add Role") {
      await fetchData(url, method, headerContent, input);
    }
    if (method === "DELETE") {
      await fetchData(url, method);
    }

    if (!error) {
      if (typeof onSuccess === "function") {
        onSuccess();
      }
    }

    clearAndClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content border border-dark rounded shadow p-4">
        <label className="modal-title">{title}</label>
        {method === "DELETE" ? (
          <div className="d-flex justify-content between mt-3">
            <label>{title}</label>
            <button
              className="btn btn-danger w-10 me-1 btn-sm"
              onClick={handleSubmit}
            >
              Delete
            </button>
            <button
              className="btn btn-secondary w-10 me-2 btn-sm"
              onClick={clearAndClose}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="d-flex justify-content between mt-3">
            <label>
              {field}
              <input
                name="input"
                required
                onChange={(e) => setInput(e.target.value)}
              />
            </label>
            <div>
              <button
                className="btn btn-primary w-20 me-1 btn-sm"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="btn btn-secondary w-20 me-2 btn-sm"
                onClick={clearAndClose}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {error && <div>Error: {error}, please try again...</div>}
      </div>
    </div>
  );
}
