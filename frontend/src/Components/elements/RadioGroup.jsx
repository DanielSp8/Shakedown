/* eslint-disable react/prop-types */
import React from "react";
import RadioButton from "./RadioButton";

export default function RadioGroup({
  options,
  selectedValue,
  onChange,
  radioId,
}) {
  return (
    <div>
      {options.map((option) => (
        <RadioButton
          id={radioId}
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
