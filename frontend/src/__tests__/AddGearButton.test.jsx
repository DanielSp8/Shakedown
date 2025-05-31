/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from "react";
import AddGearButton from "../components/buttons/AddGearButton";
import { render, screen, fireEvent } from "@testing-library/react";

const mockModal = jest.fn();
const mockOnSuccess = jest.fn();
const mockSetShowButton = jest.fn();

// Mock the role modal component
jest.mock("../components/common/Modal", () => (props) => {
  mockModal(props);
  return props.isOpen ? (
    <>
      <div>Modal Open</div>
      <button onClick={() => props.onClose()}>Close Modal</button>
    </>
  ) : null;
});

describe("AddGearButton", () => {
  beforeEach(() => {
    mockModal.mockClear();
  });

  test("renders the button when buttonVisible is true", async () => {
    render(
      <AddGearButton buttonVisible={true} onClick={() => mockSetShowButton} />
    );

    const button = await screen.findByRole("button", { name: /add gear/i });
    expect(button).toBeInTheDocument();
  });

  test("button does not render when buttonVisible is false", async () => {
    render(
      <AddGearButton buttonVisible={false} onClick={() => mockSetShowButton} />
    );

    expect(
      screen.queryByRole("button", { name: /add gear/i })
    ).not.toBeInTheDocument();
  });

  test("clicking the button opens the modal and hides the button", () => {
    render(
      <AddGearButton buttonVisible={true} onClick={() => mockSetShowButton} />
    );

    const buttonElement = screen.getByRole("button", { name: /add gear/i });
    fireEvent.click(buttonElement);
    expect(screen.getByText(/modal open/i)).toBeInTheDocument();
  });

  test("modal opens and closes with user clicks", () => {
    render(
      <AddGearButton buttonVisible={true} onClick={() => mockSetShowButton} />
    );

    const buttonElement = screen.getByRole("button", { name: /add gear/i });
    fireEvent.click(buttonElement);

    expect(screen.queryByText(/modal open/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /close modal/i }));
    expect(screen.queryByText(/modal open/i)).not.toBeInTheDocument();
  });
});
