/* eslint-disable react/prop-types */
import React, { useState } from "react";

export default function RadioButton({ value, label, checked, onChange }) {
  return (
    <div>
      <input
        type="radio"
        id={value}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={value}>{label}</label>
    </div>
  );
}
