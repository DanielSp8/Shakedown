/* eslint-disable no-undef */
import React from "react";
import { render, screen } from "@testing-library/react";
import AppSubTitle from "../Components/AppSubTitle";

describe("AppSubTitle", () => {
  describe("rendering", () => {
    it("Should render a subtitle", () => {
      render(<AppSubTitle />);

      expect(
        screen.getByText("The gear planner for backpacking")
      ).toBeInTheDocument();
    });
  });
});
