/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../components/home/Home";

// Mock children components being used in this component:
jest.mock("../components/common/AppTitle", () => () => <div>AppTitle</div>);
jest.mock("../components/home/Carousel", () => () => <div>Carousel</div>);
jest.mock("../components/home/DisplayQuote", () => () => <div>DisplayQuote</div>);

describe("Home", () => {
  test("children components render", () => {
    render(<Home />);

    expect(screen.getByText("AppTitle")).toBeInTheDocument();
    expect(screen.getByText("Carousel")).toBeInTheDocument();
    expect(screen.getByText("DisplayQuote")).toBeInTheDocument();
  });
});
