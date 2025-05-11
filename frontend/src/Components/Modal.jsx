/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import useFetchApi from "../hooks/useFetchApi";
import { translateFieldsForUser } from "../helpers/translateFieldsForUser";

export default function Modal({ isOpen, onClose, title, fields, url, method }) {
  const [formData, setFormData] = useState({ privateValue: false });
  const { fetchData, data, loading, error } = useFetchApi();

  const clearAndClose = () => {
    setFormData({});
    onClose();
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("formData: ", formData);
    // console.log("Submitting formData:", JSON.stringify(formData, null, 2));
    await fetchData(url, method, formData);
    if (!error) clearAndClose();
  };

  useEffect(() => {
    if (isOpen && fields?.length) {
      const initialData = {};
      fields.forEach((field) => {
        initialData[field] = field === "privateValue" ? false : "";
      });
      setFormData(initialData);
    }
  }, [isOpen, fields]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content border border-dark rounded shadow p-4">
        <label className="modal-title">{title}</label>
        <form className="drop-more" onSubmit={handleSubmit}>
          {fields?.map((field) => (
            <div key={field} className="form-group">
              <label>{translateFieldsForUser(field)}</label>
              {field === "privateValue" ? (
                <input
                  type="checkbox"
                  checked={formData[field] || false}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [field]: e.target.checked,
                    }))
                  }
                  className="form-check-input ms-2"
                />
              ) : (
                <input
                  type="text"
                  value={formData[field] || ""}
                  onChange={(e) => handleChange(field, e.target.value)}
                  className="form-control"
                  required
                />
              )}
            </div>
          ))}
          <div className="d-flex justify-content-between mt-3">
            <button
              type="submit"
              className="btn btn-primary w-20 me-2"
              disabled={loading}
            >
              Submit
            </button>
            {error && <p className="text-danger">{error}</p>}
            <button
              className="btn btn-secondary w-20 me-2"
              onClick={clearAndClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
