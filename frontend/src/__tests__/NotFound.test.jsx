import React from "react";
import NotFound from "../components/NotFound";
import { render, screen } from "@testing-library/react";

describe("NotFound", () => {
  test("Text renders", () => {
    render(<NotFound />);

    const textElement = screen.getByText(/sorry, page not found/i);
    expect(textElement).toBeInTheDocument();
  });
});
