/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from "react";
import DeleteGearItemButton from "../Components/DeleteGearItemButton";
import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("../Components/Modal", () => ({ isOpen }) => {
  return isOpen ? <div>Delete Gear Item Modal</div> : null;
});

describe("DeleteGearItemButton", () => {
  test("button renders", () => {
    render(<DeleteGearItemButton />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });
  test("button text renders", () => {
    render(<DeleteGearItemButton />);

    const textInfo = screen.getByText(/delete item/i);
    expect(textInfo).toBeInTheDocument();
  });
  test("shows the modal when Delete Gear Item button is clicked", () => {
    render(<DeleteGearItemButton />);

    expect(
      screen.queryByText(/delete gear item modal/i)
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByText(/delete gear item modal/i)).toBeInTheDocument();
  });
});
