import React from "react";
import { render, screen } from "@testing-library/react";
import AppTitle from "../Components/AppTitle.jsx";

describe("App Title", () => {
  describe("rendering", () => {
    it("Should render a title", () => {
      render(<AppTitle />);

      expect(screen.getByText("Shakedown")).toBeInTheDocument();
    });
  });
});

describe("App Title", () => {
  describe("rendering", () => {
    it("Should render a subtitle", () => {
      render(<AppTitle />);

      expect(
        screen.getByText("The gear planner for backpacking")
      ).toBeInTheDocument();
    });
  });
});
