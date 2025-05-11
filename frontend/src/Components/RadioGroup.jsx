/* eslint-disable react/prop-types */
import React from "react";
import RadioButton from "./RadioButton";

export default function RadioGroup({ options, selectedValue, onChange }) {
  return (
    <div>
      {options.map((option) => (
        <RadioButton
          key={option.value}
          value={option.value}
          label={option.label}
          checked={selectedValue === option.value}
          onChange={onChange}
        />
      ))}
    </div>
  );
}
