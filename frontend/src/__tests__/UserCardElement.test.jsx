/* eslint-disable no-undef */
import React from "react";
import UserCardElement from "../Components/UserCardElement";
import { render, screen } from "@testing-library/react";

jest.mock("../hooks/useFetchApi", () => ({
  __esModule: true,
  default: jest.fn(),
}));
import useFetchApi from "../hooks/useFetchApi";

describe("UserCardElement", () => {
  const mockData = ["ADMIN", "USER"];

  test("renders Loading...", () => {
    const mockFetchData = jest.fn();
    useFetchApi.mockReturnValue({
      fetchData: mockFetchData,
      data: [],
      loading: true,
      error: null,
    });

    render(<UserCardElement username={"Danielson"} onSuccess={() => {}} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders returned data", () => {
    const mockFetchData = jest.fn();
    useFetchApi.mockReturnValue({
      fetchData: mockFetchData,
      data: mockData,
      loading: false,
      error: null,
    });

    render(<UserCardElement username={"Danielson"} onSuccess={() => {}} />);

    expect(screen.getByText(/danielson/i)).toBeInTheDocument();
    expect(screen.getByText("ADMIN")).toBeInTheDocument();
    expect(screen.getByText("USER")).toBeInTheDocument();
  });
});
