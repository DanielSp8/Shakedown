/* eslint-disable no-undef */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Dropdown from "../components/elements/Dropdown";

const options = [
  { value: "item_name", label: "Item Name" },
  { value: "category", label: "Category" },
  { value: "price", label: "Price" },
];

describe("Dropdown", () => {
  test("Dropdown renders with all options", () => {
    render(
      <Dropdown
        options={options}
        selectedValue={"category"}
        setSelectedValue={() => {}}
      />
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    // Verify all option labels exist
    options.forEach((opt) => {
      expect(screen.getByText(opt.label)).toBeInTheDocument();
    });
  });

  test("selected item displays the correct, matching value", () => {
    render(
      <Dropdown
        options={options}
        selectedValue={"price"}
        setSelectedValue={() => {}}
      />
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement.value).toBe("price");
  });

  test("calls setSelectedValue when new option is selected", () => {
    const mockSetSelectedValue = jest.fn();

    render(
      <Dropdown
        options={options}
        selectedValue={"item_name"}
        setSelectedValue={mockSetSelectedValue}
      />
    );

    const selectElement = screen.getByRole("combobox");

    fireEvent.change(selectElement, { target: { value: "category" } });

    expect(mockSetSelectedValue).toHaveBeenCalledTimes(1);
    expect(mockSetSelectedValue).toHaveBeenCalledWith("category");
  });
});
