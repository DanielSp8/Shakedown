/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProfileUsername from "../Components/ProfileUsername";

jest.mock("../hooks/useUsername", () => ({
  __esModule: true,
  default: jest.fn(),
}));
import useUsername from "../hooks/useUsername";

const mockModal = jest.fn();
const mockOnSuccess = jest.fn();
jest.mock("../Components/RoleModal", () => (props) => {
  mockModal(props);
  return props.isOpen ? (
    <>
      <div>Change Password Modal</div>
      <button onClick={props.onClose}>Close Modal</button>
    </>
  ) : null;
});

describe("ProfileUsername", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("renders card with username collected from useUsername hook", () => {
    useUsername.mockReturnValue({ username: "Danielson" });
    render(<ProfileUsername onSuccess={mockOnSuccess} />);

    expect(screen.getByText(/username: danielson/i)).toBeInTheDocument();
  });

  test("renders the change password button", () => {
    useUsername.mockReturnValue({ username: "Danielson" });
    render(<ProfileUsername onSuccess={mockOnSuccess} />);

    expect(
      screen.getByRole("button", { name: "Change Password" })
    ).toBeInTheDocument();
  });

  test("modal opens on change password button click", () => {
    useUsername.mockReturnValue({ username: "Danielson" });
    render(<ProfileUsername onSuccess={mockOnSuccess} />);

    const buttonElement = screen.getByRole("button", {
      name: "Change Password",
    });
    fireEvent.click(buttonElement);
    expect(screen.getByText("Change Password Modal")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Close Modal" }));
    expect(screen.queryByText("Change Password Modal")).not.toBeInTheDocument();
  });
});
