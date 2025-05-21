/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react/display-name */
import React from "react";
import AddRoleButton from "../Components/AddRoleButton";
import { render, screen, fireEvent } from "@testing-library/react";

const mockModal = jest.fn();

// Mock the role modal component
jest.mock("../Components/RoleModal", () => (props) => {
  mockModal(props);
  return props.isOpen ? <div>Role Modal Open</div> : null;
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
        onSuccess={() => {}}
      />
    );

    const buttonElement = screen.getByRole("button", { name: /add role/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test("button does not render when showButton is false", () => {
    <AddRoleButton
      showButton={false}
      setShowButton={() => {}}
      username="testing"
      onSuccess={() => {}}
    />;

    expect(
      screen.queryByRole("button", { name: /add role/i })
    ).not.toBeInTheDocument();
  });
});

test("button has the correct Bootstrap class", () => {
  render(
    <AddRoleButton
      showButton={true}
      setShowButton={() => {}}
      username="testing"
      onSuccess={() => {}}
    />
  );

  expect(screen.getByRole("button", { name: /add role/i })).toHaveClass(
    "btn btn-primary btn-sm"
  );
});

test("clicking the button opens the modal and hides the button", () => {
  const mockSetShowButton = jest.fn();

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

test("RoleModal component receives correct props", () => {
  const mockSetShowButton = jest.fn();
  const mockOnSuccess = jest.fn();

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

  expect(mockModal).toHaveBeenCalledWith(
    expect.objectContaining({
      isOpen: true,
      title: "Add Role to testing",
      field: "Add Role",
      url: "/api/users/testing/roles",
      method: "POST",
      headerContent: "text/plain",
      onSuccess: mockOnSuccess,
      setShowButton: mockSetShowButton,
    })
  );
});
