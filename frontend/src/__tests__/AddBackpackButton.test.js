/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from "react";
import AddBackpackButton from "../Components/AddBackpackButton";
import { render, screen, fireEvent } from "@testing-library/react";

const mockModal = jest.fn();
const mockOnSuccess = jest.fn();
jest.mock("../Components/Modal", () => (props) => {
  mockModal(props);
  return props.isOpen ? (
    <>
      <div>Add Backpack Modal</div>
      <button onClick={() => props.onClose()}>Close Modal</button>
    </>
  ) : null;
});

describe("AddBackpackButton", () => {
  beforeEach(() => {
    mockModal.mockClear();
    mockOnSuccess.mockClear();
  });

  test("renders add backpack button", () => {
    render(<AddBackpackButton />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });

  test("button has the correct Bootstrap class", () => {
    render(<AddBackpackButton />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("btn", "btn-success");
  });

  test("renders text of add backpack button", () => {
    render(<AddBackpackButton />);

    const linkElement = screen.getByText(/add backpack/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("modal is not visible on initial render", () => {
    render(<AddBackpackButton />);

    expect(screen.queryByText(/add backpack modal/i)).not.toBeInTheDocument();
  });

  test("shows the modal when Add Backpack button is clicked", () => {
    render(<AddBackpackButton />);

    expect(screen.queryByText(/add backpack modal/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText(/add backpack modal/i)).toBeInTheDocument();
  });

  test("modal opens and closes with user clicks", () => {
    render(<AddBackpackButton onSuccess={mockOnSuccess} />);

    // Simulate a click of add backpack button, opening the model
    const buttonElement = screen.getByRole("button", { name: /add backpack/i });
    fireEvent.click(buttonElement);

    // Verify the model is open
    expect(screen.queryByText(/add backpack modal/i)).toBeInTheDocument();
    // Simulate click--to close the modal
    fireEvent.click(screen.getByRole("button", { name: /close modal/i }));
    // Verify it closed
    expect(screen.queryByText(/add backpack modal/i)).not.toBeInTheDocument();
  });
});
