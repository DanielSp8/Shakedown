/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import useFetchApi from "../../hooks/useFetchApi";
import { translateFieldsForUser } from "../../helpers/translateFieldsForUser";
import InputBox from "../elements/InputBox";
import useUsername from "../../hooks/useUsername";

export default function Modal({
  isOpen,
  onClose,
  title,
  fields = null,
  backpackId = null,
  itemId = null,
  url,
  method,
  onSuccess,
}) {
  const [formData, setFormData] = useState({ privateValue: false });
  const { fetchData, data, loading, error } = useFetchApi();
  const { username } = useUsername();

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
    // This is for deleting
    if (method === "DELETE") {
      await fetchData(url, method);
    } else if (formData) {
      // This is for adding or updating
      await fetchData(url, method, "application/json", formData);
    }
    if (!error) {
      // Verify that onSuccess function is reliable
      if (typeof onSuccess === "function") {
        onSuccess();
      }
      clearAndClose();
    }
  };

  useEffect(() => {
    if (isOpen && fields?.length) {
      // initialData object initialized and used to update state (in formData)
      const initialData = {};

      if (itemId) {
        initialData["itemId"] = itemId;
      }
      if (backpackId) {
        initialData["backpackId"] = backpackId;
      }

      // Place logged in username into the ownerUsername field
      initialData["ownerUsername"] = username;

      // Set default values for each field
      fields.forEach((field) => {
        // Checkbox field set to false.  All is else set to an empty string
        initialData[field] = field === "privateValue" ? false : "";
      });
      setFormData(initialData);
    }
  }, [isOpen, fields, itemId, backpackId]);

  // This keep the modal invisible if the value of isOpen is false
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content border border-dark rounded shadow p-4">
        <label className="modal-title">{title}</label>
        {method === "DELETE" ? (
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
        ) : (
          <form id="modalForm" className="drop-more" onSubmit={handleSubmit}>
            {fields?.map((field) => (
              <div key={field} className="form-group">
                <label>{translateFieldsForUser(field)}</label>
                <InputBox
                  field={field}
                  formData={formData}
                  handleChange={handleChange}
                />
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
        )}
      </div>
    </div>
  );
}
