import React from "react";
import UpdateGearButton from "../Components/UpdateGearButton";
import { render, screen } from "@testing-library/react";

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
});
