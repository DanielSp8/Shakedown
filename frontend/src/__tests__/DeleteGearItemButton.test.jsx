/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from "react";
import DeleteGearItemButton from "../components/buttons/DeleteGearItemButton";
import { render, screen, fireEvent } from "@testing-library/react";

const mockModal = jest.fn();
jest.mock("../components/common/Modal", () => (props) => {
  mockModal(props);
  return props.isOpen ? (
    <>
      <div>Delete Gear Item Modal</div>
      <button onClick={() => props.onClose()}>Close Modal</button>
    </>
  ) : null;
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
  test("modal opens and closes with user clicks", () => {
    render(<DeleteGearItemButton />);

    fireEvent.click(screen.getByRole("button", { name: /delete item/i }));
    expect(screen.getByText(/delete gear item modal/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /close modal/i }));
    expect(
      screen.queryByText(/delete gear item modal/i)
    ).not.toBeInTheDocument();
  });
});
