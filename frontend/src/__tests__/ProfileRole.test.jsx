/* eslint-disable no-undef */
import React from "react";
import { render, screen } from "@testing-library/react";
import ProfileRole from "../Components/ProfileRole";

jest.mock("../hooks/useRole", () => ({
  __esModule: true,
  default: jest.fn(),
}));
import useRole from "../hooks/useRole";

jest.mock("../Components/AdminProfile", () => () => <div>Admin Profile</div>);
jest.mock("../Components/UserProfile", () => () => <div>User Profile</div>);

describe("ProfileRole", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("renders AdminProfile Component if ADMIN role", () => {
    useRole.mockReturnValue({ role: ["ADMIN"] });
    render(<ProfileRole />);

    expect(screen.getByText("Admin Profile")).toBeInTheDocument();
  });

  test("displays UserProfile Component on other roles besides ADMIN", () => {
    useRole.mockReturnValue({ role: ["USER"] });

    render(<ProfileRole />);

    expect(screen.getByText("User Profile")).toBeInTheDocument();
  });
});
