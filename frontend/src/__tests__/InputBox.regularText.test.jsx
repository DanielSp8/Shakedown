/* eslint-disable no-undef */
// Mocks are placed at the top of this file, to ensure that they are called first
jest.mock("../helpers/checkForDecimalField", () => ({
  checkForDecimalField: () => false,
}));
jest.mock("../helpers/translateFieldsForUser", () => ({
  translateFieldsForUser: () => "Item Name",
}));

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InputBox from "../Components/InputBox";

describe("InputBox: regular text fields", () => {
  const mockFormData = {
    itemName: "JetBoil",
    category: "Cookware",
    description: "Boils water very quickly!",
    weightLbs: 1,
    weightOz: 12,
    price: 121.99,
  };

  const handleChange = jest.fn();

  test("renders a text input with correct placeholder", () => {
    render(
      <InputBox
        field="itemName"
        formData={mockFormData}
        handleChange={handleChange}
      />
    );

    const inputElement = screen.getByPlaceholderText("Enter the Item Name");
    expect(inputElement).toBeInTheDocument();
  });

  test("typing updates value and calls handleChange", () => {
    render(
      <InputBox
        field="itemName"
        formData={mockFormData}
        handleChange={handleChange}
      />
    );

    const inputElement = screen.getByPlaceholderText("Enter the Item Name");
    fireEvent.change(inputElement, { target: { value: "Tent" } });
    expect(handleChange).toHaveBeenCalledWith("itemName", "Tent");
    expect(inputElement.value).toBe("Tent");
  });
});
