/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../Components/Home";

// Mock children components being used in this component:
jest.mock("../Components/AppTitle", () => () => <div>AppTitle</div>);
jest.mock("../Components/Carousel", () => () => <div>Carousel</div>);
jest.mock("../Components/DisplayQuote", () => () => <div>DisplayQuote</div>);

describe("Home", () => {
  test("children components render", () => {
    render(<Home />);

    expect(screen.getByText("AppTitle")).toBeInTheDocument();
    expect(screen.getByText("Carousel")).toBeInTheDocument();
    expect(screen.getByText("DisplayQuote")).toBeInTheDocument();
  });
});
