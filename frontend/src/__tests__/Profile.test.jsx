/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import React from "react";
import { render, screen } from "@testing-library/react";
import Profile from "../Components/Profile";

jest.mock("../Components/AppTitle", () => () => <div>AppTitle</div>);
jest.mock("../Components/ProfileUsername", () => () => (
  <div>ProfileUsername</div>
));
jest.mock("../Components/ProfileRole", () => () => <div>ProfileRole</div>);

describe("Profile", () => {
  test("Components display on render", () => {
    render(<Profile />);

    expect(screen.getByText("AppTitle")).toBeInTheDocument();
    expect(screen.getByText("ProfileUsername")).toBeInTheDocument();
    expect(screen.getByText("ProfileRole")).toBeInTheDocument();
  });
});
