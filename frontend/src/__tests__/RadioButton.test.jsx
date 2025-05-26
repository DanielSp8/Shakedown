import React from "react";
import RadioButton from "../Components/RadioButton";
import { render, screen } from "@testing-library/react";

describe("RadioButton", () => {
  test("Input radio button renders", () => {
    render(
      <RadioButton
        value="option1"
        label="Option 1"
        checked={false}
        onChange={() => {}}
      />
    );
    const radioElement = screen.getByRole("radio");
    expect(radioElement).toBeInTheDocument();
  });

  test("Radio button label renders correctly", () => {
    render(
      <RadioButton
        value="option1"
        label="Option 1"
        checked={false}
        onChange={() => {}}
      />
    );

    const labelItem = screen.getByLabelText("Option 1");
    expect(labelItem).toBeInTheDocument();
  });
});
