/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react/display-name */
import React from "react";
import AddRoleButton from "../Components/AddRoleButton";
import { render, screen, fireEvent } from "@testing-library/react";

const mockModal = jest.fn();
const mockOnSuccess = jest.fn();
const mockSetShowButton = jest.fn();

// Mock the role modal component
jest.mock("../Components/RoleModal", () => (props) => {
  mockModal(props);
  return props.isOpen ? (
    <>
      <div>Role Modal Open</div>
      <button onClick={() => props.onClose()}>Close Modal</button>
    </>
  ) : null;
});

describe("AddRoleButton", () => {
  beforeEach(() => {
    mockModal.mockClear();
  });

  test("renders the button when showButton is true", () => {
    render(
      <AddRoleButton
        showButton={true}
        setShowButton={() => {}}
        username="testing"
        onSuccess={mockOnSuccess}
      />
    );

    const buttonElement = screen.getByRole("button", { name: /add role/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test("button does not render when showButton is false", () => {
    render(
      <AddRoleButton
        showButton={false}
        setShowButton={() => {}}
        username="testing"
        onSuccess={() => {}}
      />
    );

    expect(
      screen.queryByRole("button", { name: /add role/i })
    ).not.toBeInTheDocument();
  });

  test("clicking the button opens the modal and hides the button", () => {
    render(
      <AddRoleButton
        showButton={true}
        setShowButton={mockSetShowButton}
        username="testing"
        onSuccess={() => {}}
      />
    );

    const buttonElement = screen.getByRole("button", { name: /add role/i });
    fireEvent.click(buttonElement);

    expect(screen.getByText(/role modal open/i)).toBeInTheDocument();

    expect(mockSetShowButton).toHaveBeenCalledWith(false);
  });

  test("modal opens and closes with user clicks", () => {
    render(
      <AddRoleButton
        showButton={true}
        setShowButton={mockSetShowButton}
        username="testing"
        onSuccess={mockOnSuccess}
      />
    );

    const buttonElement = screen.getByRole("button", { name: /add role/i });
    fireEvent.click(buttonElement);

    expect(screen.queryByText(/role modal open/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /close modal/i }));
    expect(screen.queryByText(/role modal open/i)).not.toBeInTheDocument();
  });
});
