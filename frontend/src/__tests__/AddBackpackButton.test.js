import React from "react";
import AddBackpackButton from "../Components/AddBackpackButton";
import { render, screen } from "@testing-library/react";

describe("AddBackpackButton", () => {
  test("renders add backpack button", () => {
    render(<AddBackpackButton />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument;

    const linkElement = screen.getByText(/add backpack/i);
    expect(linkElement).toBeInTheDocument();
  });
});
