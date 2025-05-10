/* eslint-disable no-undef */
import React from "react";
import { render, screen } from "@testing-library/react";
import AppTitle from "../Components/AppTitle.jsx";

describe("AppTitle", () => {
  describe("rendering", () => {
    it("Should render a title", () => {
      render(<AppTitle />);

      expect(screen.getByText("Shakedown")).toBeInTheDocument();
    });
  });
});
