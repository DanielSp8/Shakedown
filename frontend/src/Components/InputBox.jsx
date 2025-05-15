/* eslint-disable react/prop-types */
import React from "react";
import { useState } from "react";
import { translateFieldsForUser } from "../helpers/translateFieldsForUser";
import { checkForDecimalField } from "../helpers/checkForDecimalField";

export default function InputBox({ field, formData, handleChange }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const verifyValue = (e) => {
    const input = e.target.value;
    setValue(input);

    if (input && !/^\d*\.?\d*$/.test(input)) {
      setError("Must be a valid decimal number.");
    } else {
      setError("");
      handleChange(field, input);
    }
  };

  if (field === "privateValue")
    return (
      <div>
        <input
          type="checkbox"
          checked={formData[field] || false}
          onChange={(e) => handleChange(field, e.target.checked)}
          className="form-check-input ms-2"
        />
      </div>
    );
  else if (checkForDecimalField(field))
    return (
      <div>
        <input
          type="text"
          value={value}
          onChange={verifyValue}
          className="form-control"
          required
          placeholder="Enter decimal value"
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    );
  else {
    return (
      <div>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            handleChange(field, e.target.value);
          }}
          className="form-control"
          placeholder={`Enter the ${translateFieldsForUser(field)}`}
          required
        />
      </div>
    );
  }
}
