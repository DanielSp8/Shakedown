/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import React from "react";
import { render, screen } from "@testing-library/react";
import Backpacks from "../Components/Backpacks";

// Mock the children components that this component uses
jest.mock("../Components/AddBackpackbutton", () => ({ onSuccess }) => (
  <div>AddBackpackButton</div>
));

jest.mock("../Components/Backpack", () => (props) => {
  return <div>Backpack Component</div>;
});

jest.mock("../Components/ShowGearInBackpack", () => ({ backpackId }) => (
  <div>ShowGearInBackpack: {backpackId}</div>
));

describe("Backpacks", () => {
  test("shows the initial children components AddBackpackButton and Backpack", () => {
    render(<Backpacks />);

    expect(screen.getByText("AddBackpackButton")).toBeInTheDocument();
    expect(screen.getByText("Backpack Component")).toBeInTheDocument();
  });
});
