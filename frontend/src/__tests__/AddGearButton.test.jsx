/* eslint-disable no-undef */
/* eslint-disable react/display-name */
import React from "react";
import AddGearButton from "../Components/AddGearButton";
import { render, screen, fireEvent } from "@testing-library/react";

// Mock the Modal component
jest.mock("../Components/Modal", () => ({ isOpen }) => {
  return isOpen ? <div>Add Gear Item Modal</div> : null;
});

describe("AddGearButton", () => {
  test("renders Add Gear button", () => {
    render(<AddGearButton />);
    const nameElement = screen.getByRole("button");
    expect(nameElement).toBeInTheDocument();
  });

  test("renders text for button", () => {
    render(<AddGearButton />);
    const textElement = screen.getByText(/add gear/i);
    expect(textElement).toBeInTheDocument();
  });

  test("shows the modal when the Add Gear Button is clicked", () => {
    render(<AddGearButton backpackId={1} onSuccess={jest.fn()} />);

    // Make sure modal is not initially visible
    expect(screen.queryByText(/add gear item modal/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByText(/add gear item modal/i)).toBeInTheDocument();
  });
});
