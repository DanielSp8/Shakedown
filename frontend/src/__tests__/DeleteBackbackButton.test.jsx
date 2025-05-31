/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react/display-name */
import React from "react";
import DeleteBackpackButton from "../components/buttons/DeleteBackpackButton";
import { screen, render, fireEvent } from "@testing-library/react";

const mockModal = jest.fn();
const mockOnSuccess = jest.fn();
jest.mock("../components/common/Modal", () => (props) => {
  mockModal(props);
  return props.isOpen ? (
    <>
      <div>Delete Backpack Modal</div>
      <button onClick={() => props.onClose()}>Close Modal</button>
    </>
  ) : null;
});

describe("DeletebackpackButton", () => {
  beforeEach(() => {
    mockModal.mockClear();
    mockOnSuccess.mockClear();
  });

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

  test("modal opens and closes with user clicks", () => {
    render(
      <DeleteBackpackButton
        backpackName={"Philmont 2017"}
        backpackId={7}
        onSuccess={mockOnSuccess}
      />
    );

    const buttonElement = screen.getByRole("button", {
      name: /delete backpack/i,
    });
    fireEvent.click(buttonElement);
    expect(screen.getByText(/delete backpack modal/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /close modal/i }));
    expect(
      screen.queryByText(/delete backpack modal/i)
    ).not.toBeInTheDocument();
  });
});
