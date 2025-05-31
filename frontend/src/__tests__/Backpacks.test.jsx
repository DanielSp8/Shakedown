/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Backpacks from "../components/backpacks/Backpacks";

// Mock the children components that this component uses
jest.mock("../components/buttons/AddBackpackButton", () => (props) => {
  return (
    <>
      <div>AddBackpackButton</div>
      <button onClick={props.onSuccess}>Trigger Refresh</button>
    </>
  );
});

jest.mock("../components/backpacks/Backpack", () => (props) => {
  return (
    <>
      <div>Backpack Component refreshKey: {props.refreshKey}</div>
      <button
        onClick={() => {
          props.setSelectedBackpackId(123);
          props.setDisplayGear(true);
        }}
      >
        Display Gear
      </button>
    </>
  );
});

jest.mock("../components/backpacks/ShowGearInBackpack", () => (props) => {
  return <div>ShowGearInBackpack: {props.backpackId}</div>;
});

describe("Backpacks", () => {
  test("shows the initial children components AddBackpackButton and Backpack", () => {
    render(<Backpacks />);

    expect(screen.getByText("AddBackpackButton")).toBeInTheDocument();
    expect(screen.getByText(/Backpack Component/i)).toBeInTheDocument();
  });

  test("simulates Display Gear button click", () => {
    render(<Backpacks />);

    const buttonElement = screen.getByRole("button", { name: /display gear/i });
    fireEvent.click(buttonElement);

    expect(screen.getByText(/ShowGearInBackpack: 123/i)).toBeInTheDocument();
    expect(screen.queryByText(/AddBackpackButton/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Backpack Component/i)).not.toBeInTheDocument();
  });

  test("simulate trigger refresh function", () => {
    render(<Backpacks />);

    expect(
      screen.getByText(/backpack component refreshkey: 0/i)
    ).toBeInTheDocument();
    const buttonElement = screen.getByRole("button", {
      name: /trigger refresh/i,
    });
    fireEvent.click(buttonElement);
    expect(
      screen.getByText(/backpack component refreshkey: 1/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/backpack component refreshkey: 0/i)
    ).not.toBeInTheDocument();
  });

  test("displayGear renders on user click of display gear button", () => {
    render(<Backpacks />);

    const buttonElement = screen.getByRole("button", { name: /display gear/i });
    fireEvent.click(buttonElement);

    expect(screen.getByText(/ShowGearInBackpack: 123/i)).toBeInTheDocument();
    expect(screen.queryByText("Backpack Component")).not.toBeInTheDocument();
    expect(screen.queryByText("AddBackpackButton")).not.toBeInTheDocument();
  });
});
