/* eslint-disable react/prop-types */
import React, { useState } from "react";

export default function Dropdown({ options, selectedValue, setSelectedValue, dropdownId }) {
  const handleSelect = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="dropdown">
      <select id={dropdownId} value={selectedValue} onChange={handleSelect}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
