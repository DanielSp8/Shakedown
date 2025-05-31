/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import React from "react";
import UpdateGearButton from "../components/buttons/UpdateGearButton";
import { render, screen, fireEvent } from "@testing-library/react";

// Mock the Modal component
const mockModal = jest.fn();
jest.mock("../components/common/Modal", () => (props) => {
  mockModal(props);
  return props.isOpen ? (
    <>
      <div>Edit Gear Item Modal</div>
      <button onClick={() => props.onClose()}>Close Modal</button>
    </>
  ) : null;
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

  test("modal opens and closes with user clicks", () => {
    render(
      <UpdateGearButton itemId={1} backpackId={2} onSuccess={jest.fn()} />
    );

    expect(screen.queryByText(/edit gear item modal/i)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Edit Gear" }));
    expect(screen.getByText(/edit gear item modal/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Close Modal" }));
    expect(screen.queryByText(/edit gear item modal/i)).not.toBeInTheDocument();
  });
});
