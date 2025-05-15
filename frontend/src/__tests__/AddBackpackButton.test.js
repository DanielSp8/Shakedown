/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from "react";
import AddBackpackButton from "../Components/AddBackpackButton";
import { render, screen, fireEvent } from "@testing-library/react";

// Mock the modal component
jest.mock("../Components/Modal", () => ({ isOpen }) => {
  return isOpen ? <div>Add Backpack Modal</div> : null;
});

describe("AddBackpackButton", () => {
  test("renders add backpack button", () => {
    render(<AddBackpackButton />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument;
  });
  test("renders text of add backpack button", () => {
    render(<AddBackpackButton />);

    const linkElement = screen.getByText(/add backpack/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("shows the modal when Add Backpack button is clicked", () => {
    render(<AddBackpackButton />);

    expect(screen.queryByText(/add backpack modal/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByText(/add backpack modal/i)).toBeInTheDocument();
  });
});
