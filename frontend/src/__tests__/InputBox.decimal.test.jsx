/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// Mocks are placed at the top of this file, to ensure that they are called first
jest.mock("../helpers/checkForDecimalField", () => ({
  checkForDecimalField: () => true,
}));
jest.mock("../helpers/translateFieldsForUser", () => ({
  translateFieldsForUser: () => "Price",
}));

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InputBox from "../Components/InputBox";

describe("when field is a decimal value", () => {
  const mockFormData = {
    itemName: "JetBoil",
    category: "Cookware",
    description: "Boils water very quickly!",
    weightLbs: 1,
    weightOz: 12,
    price: 121.99,
  };

  const handleChange = jest.fn();

  test("give a decimal input field if checkForDecimal(field) returns true", () => {
    render(
      <InputBox
        field={"price"}
        formData={mockFormData}
        handleChange={handleChange}
      />
    );

    expect(
      screen.getByPlaceholderText("Enter decimal value")
    ).toBeInTheDocument();
  });
  test("accepts a valid decimal", () => {
    render(
      <InputBox
        field={"price"}
        formData={mockFormData}
        handleChange={handleChange}
      />
    );

    const inputElement = screen.getByPlaceholderText("Enter decimal value");
    fireEvent.change(inputElement, { target: { value: "5.2" } });
    // Verify handleChange was called in the right way
    expect(handleChange).toHaveBeenCalledWith("price", "5.2");
    // Check for error message:
    expect(
      screen.queryByText("Must be a valid decimal number.")
    ).not.toBeInTheDocument();
  });

  test("reject invalid decimal input", () => {
    handleChange.mockClear();

    render(
      <InputBox
        field={"price"}
        formData={mockFormData}
        handleChange={handleChange}
      />
    );

    const inputElement = screen.getByPlaceholderText("Enter decimal value");
    fireEvent.change(inputElement, { target: { value: "testing" } });
    expect(
      screen.getByText("Must be a valid decimal number.")
    ).toBeInTheDocument();

    expect(handleChange).not.toHaveBeenCalled();
  });

  test("clears error when invalid decimal input is fixed", () => {
    handleChange.mockClear();
    render(
      <InputBox
        field={"price"}
        formData={mockFormData}
        handleChange={handleChange}
      />
    );

    const inputElement = screen.getByPlaceholderText("Enter decimal value");
    fireEvent.change(inputElement, { target: { value: "testing" } });
    expect(
      screen.getByText("Must be a valid decimal number.")
    ).toBeInTheDocument();

    expect(handleChange).not.toHaveBeenCalled();

    fireEvent.change(inputElement, { target: { value: "3.14" } });
    expect(
      screen.queryByText("Must be a valid decimal number.")
    ).not.toBeInTheDocument();
    expect(handleChange).toHaveBeenCalledWith("price", "3.14");
  });
});
