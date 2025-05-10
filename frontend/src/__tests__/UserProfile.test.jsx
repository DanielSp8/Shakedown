/* eslint-disable no-undef */
import React from "react";
import UserProfile from "../Components/UserProfile";
import { render, screen } from "@testing-library/react";

describe(UserProfile, () => {
  it("User Profile displays", () => {
    render(<UserProfile />);

    expect(screen.getByText("Current Role: USER")).toBeInTheDocument();
  });
});
