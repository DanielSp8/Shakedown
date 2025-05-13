import React from "react";
import DeleteGearItemButton from "../Components/DeleteGearItemButton";
import { render, screen } from "@testing-library/react";

describe("DeleteGearItemButton", () => {
  test("button and test renders", () => {
    render(<DeleteGearItemButton />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();

    const textInfo = screen.getByText(/delete item/i);
    expect(textInfo).toBeInTheDocument();
  });
});
