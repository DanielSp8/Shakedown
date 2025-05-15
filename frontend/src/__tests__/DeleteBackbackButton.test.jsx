/* eslint-disable no-undef */
/* eslint-disable react/display-name */
import React from "react";
import DeleteBackpackButton from "../Components/DeleteBackpackButton";
import { screen, render, fireEvent } from "@testing-library/react";

// Mock the modal component
jest.mock("../Components/Modal", () => ({ isOpen }) => {
  return isOpen ? <div>Delete Backpack Modal</div> : null;
});

describe("DeletebackpackButton", () => {
  test("button and text renders", () => {
    render(<DeleteBackpackButton />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });
  test("button text renders", () => {
    render(<DeleteBackpackButton />);

    const textInfo = screen.getByText("Delete Backpack");
    expect(textInfo).toBeInTheDocument();
  });
  test("shows the modal when Delete Backpack button is clicked", () => {
    render(<DeleteBackpackButton />);

    expect(
      screen.queryByText(/delete backpack modal/i)
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByText(/delete backpack modal/i)).toBeInTheDocument();
  });
});
