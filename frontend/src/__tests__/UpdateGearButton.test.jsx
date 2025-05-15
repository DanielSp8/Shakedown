/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import React from "react";
import UpdateGearButton from "../Components/UpdateGearButton";
import { render, screen, fireEvent } from "@testing-library/react";

// Mock the Modal component
jest.mock("../Components/Modal", () => ({ isOpen }) => {
  return isOpen ? <div>Edit Gear Item Modal</div> : null;
});

describe("UpdateGearButton", () => {
  test("button renders", () => {
    render(<UpdateGearButton />);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });

  test("button's text renders correctly", () => {
    render(<UpdateGearButton />);
    const textInfo = screen.getByText(/edit gear/i);
    expect(textInfo).toBeInTheDocument();
  });

  test("shows the modal when Edit Gear button is clicked", () => {
    render(
      <UpdateGearButton itemId={1} backpackId={2} onSuccess={jest.fn()} />
    );

    // Make sure modal is not initially visible
    expect(screen.queryByText(/edit gear item modal/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByText(/edit gear item modal/i)).toBeInTheDocument();
  });
});
