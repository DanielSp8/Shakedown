/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react/display-name */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DeleteUserButton from "../Components/DeleteUserButton";

const mockModal = jest.fn();

// Mock the role modal component
jest.mock("../Components/RoleModal", () => (props) => {
  mockModal(props);
  return props.isOpen ? <div>Role Modal Open</div> : null;
});

describe("Delete User Button", () => {
  beforeEach(() => {
    mockModal.mockClear();
  });

  test("renders the button when showButton is true", () => {
    render(
      <DeleteUserButton
        showButton={true}
        setShowButton={() => {}}
        username={"testing"}
        onSuccess={() => {}}
      />
    );

    const buttonElement = screen.getByRole("button", { name: /delete user/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test("button does not render when showButton is false", () => {
    render(
      <DeleteUserButton
        showButton={false}
        setShowButton={() => {}}
        username={"testing"}
        onSuccess={() => {}}
      />
    );

    expect(
      screen.queryByRole("button", { name: /delete user/i })
    ).not.toBeInTheDocument();
  });

  test("button has the correct Bootstrap class", () => {
    render(
      <DeleteUserButton
        showButton={true}
        setShowButton={() => {}}
        username={"testing"}
        onSuccess={() => {}}
      />
    );

    expect(screen.getByRole("button", { name: /delete user/i })).toHaveClass(
      "btn btn-danger btn-sm"
    );
  });

  test("clicking the button opens the modal and hides the button", () => {
    const mockSetShowButton = jest.fn();

    render(
      <DeleteUserButton
        showButton={true}
        setShowButton={mockSetShowButton}
        username={"testing"}
        onSuccess={() => {}}
      />
    );

    const buttonElement = screen.getByRole("button", { name: /delete user/i });
    fireEvent.click(buttonElement);

    expect(screen.getByText(/role modal open/i)).toBeInTheDocument();

    expect(mockSetShowButton).toHaveBeenCalledWith(false);
  });

  test("RoleModal component receives correct props", () => {
    const mockSetShowButton = jest.fn();
    const mockOnSuccess = jest.fn();

    render(
      <DeleteUserButton
        showButton={true}
        setShowButton={mockSetShowButton}
        username={"testing"}
        onSuccess={mockOnSuccess}
      />
    );

    const buttonElement = screen.getByRole("button", { name: /delete user/i });
    fireEvent.click(buttonElement);

    expect(mockModal).toHaveBeenCalledWith(
      expect.objectContaining({
        isOpen: true,
        title: "Delete User: testing?",
        url: "/api/users/testing",
        method: "DELETE",
        onSuccess: mockOnSuccess,
        setShowButton: mockSetShowButton,
      })
    );
  });
});
