/* eslint-disable no-undef */
import React from "react";
import { render, screen } from "@testing-library/react";
import DisplayQuote from "../components/home/DisplayQuote";

describe("DisplayQuote", () => {
  describe("rendering", () => {
    it("Should render a quote and quote author", () => {
      render(<DisplayQuote />);

      expect(
        screen.getByText(
          "“I took a walk in the woods and came out taller than trees.”"
        )
      ).toBeInTheDocument();
      expect(screen.getByText("— Henry David Thoreau")).toBeInTheDocument();
    });
  });
});
