/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/display-name */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AuthPage from "../components/auth/AuthPage";

// Mock components used in AuthPage
jest.mock("../components/auth/LoginForm", () => () => <div>LoginForm</div>);
jest.mock("../components/auth/SignUpForm", () => () => <div>SignUpForm</div>);
jest.mock("../components/common/AppTitle", () => () => <div>AppTitle</div>);

describe("AuthPage", () => {
  test("renders login view on initial render", () => {
    render(<AuthPage />);

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("LoginForm")).toBeInTheDocument();
    expect(screen.getByText("Don't have a username?")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign up/i })
    ).toBeInTheDocument();
    expect(screen.getByText("AppTitle")).toBeInTheDocument();
  });

  test("toggle to sign up view when sign up button is clicked", () => {
    render(<AuthPage />);

    const toggleButton = screen.getByRole("button", { name: /sign up/i });
    fireEvent.click(toggleButton);

    expect(screen.getByText("Sign Up")).toBeInTheDocument();
    expect(screen.getByText("SignUpForm")).toBeInTheDocument();
    expect(screen.getByText("Already have a username?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText("AppTitle")).toBeInTheDocument();
  });
});
