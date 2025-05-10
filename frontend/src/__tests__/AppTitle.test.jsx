/* eslint-disable no-undef */
import React from "react";
import { render, screen } from "@testing-library/react";
import AppTitle from "../Components/AppTitle.jsx";

describe("AppTitle", () => {
  describe("rendering", () => {
    it("Should render a title and subtitle", () => {
      render(<AppTitle />);

      expect(screen.getByText("Shakedown")).toBeInTheDocument();
      expect(
        screen.getByText("The gear planner for backpacking")
      ).toBeInTheDocument();
    });
  });
});
