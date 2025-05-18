/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import useFetchApi from "../hooks/useFetchApi";

export default function RoleModal({
  isOpen,
  onClose,
  title,
  field,
  url,
  method,
  onSuccess,
}) {
  const { fetchData, data, loading, error } = useFetchApi();
  const [input, setInput] = useState("");

  const clearAndClose = () => {
    setInput("");
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (method === "POST" && field === "Add Role") {
      try {
        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "text/plain",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: input,
        });

        // await fetchData(url, method, input);
        if (!response.ok) {
          console.error("Failed to add role:", response.status);
          return;
        }
      } catch (err) {
        console.error("Fetch error:", err);
        return;
      }
    }

    if (typeof onSuccess === "function") {
      onSuccess();
    }
    clearAndClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content border border-dark rounded shadow p-4">
        <label className="modal-title">{title}</label>
        {method === "DELETE" && field === "Delete Role" ? (
          <div className="d-flex justify-content between mt-3">
            <button className="btn btn-danger w-20 me-2" onClick={handleSubmit}>
              Delete
            </button>
            <button
              className="btn btn-secondary w-20 me-2"
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
                className="btn btn-primary w-20 me-1"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="btn btn-secondary w-20 me-2"
                onClick={clearAndClose}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
