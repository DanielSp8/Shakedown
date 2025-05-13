import React from "react";
import DeleteBackpackButton from "../Components/DeleteBackpackButton";
import { screen, render } from "@testing-library/react";

describe("DeletebackpackButton", () => {
  test("button and text renders", () => {
    render(<DeleteBackpackButton />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();

    const textInfo = screen.getByText("Delete Backpack");
    expect(textInfo).toBeInTheDocument();
  });
});
