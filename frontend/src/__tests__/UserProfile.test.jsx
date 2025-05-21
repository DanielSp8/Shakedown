/* eslint-disable no-undef */
import React from "react";
import UserProfile from "../Components/UserProfile";
import { render, screen } from "@testing-library/react";

// Mock the custom hook useRole
jest.mock("../hooks/useRole", () => ({
  __esModule: true,
  default: () => ({
    role: "ADMIN",
  }),
}));

describe(UserProfile, () => {
  test("displays the role returned by useRole", () => {
    render(<UserProfile />);

    const roleElement = screen.getByText(/current role: admin/i);
    expect(roleElement).toBeInTheDocument();
  });
});
