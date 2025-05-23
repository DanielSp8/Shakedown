/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react/display-name */
import React from "react";
import AddGearButton from "../Components/AddGearButton";
import { render, screen, fireEvent } from "@testing-library/react";

const mockModal = jest.fn();
const mockOnSuccess = jest.fn();
// Mock the Modal component
jest.mock("../Components/Modal", () => (props) => {
  mockModal(props);
  return props.isOpen ? (
    <>
      <div>Add Gear Item Modal</div>
      <button onClick={() => props.onClose()}>Close Modal</button>
    </>
  ) : null;
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
    render(<AddGearButton backpackId={1} onSuccess={mockOnSuccess} />);

    // Make sure modal is not initially visible
    expect(screen.queryByText(/add gear item modal/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByText(/add gear item modal/i)).toBeInTheDocument();
  });

  test("modal opens and closes with user clicks", () => {
    render(<AddGearButton onSuccess={mockOnSuccess} />);

    // Simulate a click of add backpack button, opening the model
    const buttonElement = screen.getByRole("button", { name: /add gear/i });
    fireEvent.click(buttonElement);

    // Verify the model is open
    expect(screen.queryByText(/add gear item modal/i)).toBeInTheDocument();
    // Simulate click--to close the modal
    fireEvent.click(screen.getByRole("button", { name: /close modal/i }));
    // Verify it closed
    expect(screen.queryByText(/add gear item modal/i)).not.toBeInTheDocument();
  });
});
