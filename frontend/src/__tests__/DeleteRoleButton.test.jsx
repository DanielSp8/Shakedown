/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DeleteRoleButton from "../Components/DeleteRoleButton";

jest.mock("../Components/RoleModal", () => ({ isOpen }) => {
  return isOpen ? <div>Delete Role Modal</div> : null;
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
});
