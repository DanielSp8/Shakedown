/* eslint-disable no-undef */
import React from "react";
import { render, screen } from "@testing-library/react";
import AppTitle from "../components/common/AppTitle";

describe("rendering AppTitle", () => {
  test("Should render title", () => {
    render(<AppTitle />);

    expect(screen.getByText("Shakedown")).toBeInTheDocument();
  });
  test("Should render subtitle", () => {
    render(<AppTitle />);
    expect(
      screen.getByText("The gear planner for backpacking")
    ).toBeInTheDocument();
  });
});
