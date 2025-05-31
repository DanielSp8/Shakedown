/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import React from "react";
import { render, screen } from "@testing-library/react";
import Profile from "../components/profile/Profile";

jest.mock("../components/common/AppTitle", () => () => <div>AppTitle</div>);
jest.mock("../components/profile/AdminProfile", () => () => (
  <div>AdminProfile</div>
));
jest.mock("../components/profile/UserProfile", () => () => <div>ProfileRole</div>);

describe("Profile", () => {
  test("Components display on render", () => {
    render(<Profile />);

    expect(screen.getByText("AppTitle")).toBeInTheDocument();
  });
});
