import React from "react";
import AddGearButton from "../Components/AddGearButton";
import { render, screen } from "@testing-library/react";

test("renders Add Gear button", () => {
  render(<AddGearButton />);
  const nameElement = screen.getByRole("button");
  expect(nameElement).toBeInTheDocument();

  const textElement = screen.getByText(/add gear/i);
  expect(textElement).toBeInTheDocument();
});
