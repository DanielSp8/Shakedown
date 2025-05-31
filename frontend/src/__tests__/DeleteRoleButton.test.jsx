/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DeleteRoleButton from "../components/buttons/DeleteRoleButton";

const mockModal = jest.fn();
jest.mock("../components/common/RoleModal", () => (props) => {
  mockModal(props);
  return props.isOpen ? (
    <>
      <div>Delete Role Modal</div>
      <button onClick={() => props.onClose()}>Close Modal</button>
    </>
  ) : null;
});

describe("DeleteRoleButton", () => {
  test("button renders", () => {
    render(<DeleteRoleButton />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });

  test("button text renders", () => {
    render(<DeleteRoleButton />);

    const textInfo = screen.getByText(/delete role/i);
    expect(textInfo).toBeInTheDocument;
  });

  test("shows the RoleModal when Delete Role button is clicked", () => {
    render(<DeleteRoleButton />);

    expect(screen.queryByText(/delete role modal/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByText(/delete role modal/i)).toBeInTheDocument();
  });

  test("modal opens and closes with user clicks", () => {
    render(<DeleteRoleButton />);

    fireEvent.click(screen.getByRole("button", { name: /delete role/i }));
    expect(screen.getByText(/delete role modal/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /close modal/i }));
    expect(screen.queryByText(/delete role modal/i)).not.toBeInTheDocument();
  });
});
