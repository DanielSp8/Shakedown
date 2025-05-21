/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import React from "react";
import { render, screen } from "@testing-library/react";
import AdminProfile from "../Components/AdminProfile";

// Mock other components being used
jest.mock("../Components/UserCardElement", () => ({ username }) => {
  <div>UserCard: {username}</div>;
});

jest.mock("../Components/AddRoleButton", () => ({ username }) => (
  <div>AddRoleButton: {username}</div>
));

jest.mock("../Components/DeleteUserButton", () => ({ username }) => (
  <div>DeleteUserButton: {username}</div>
));

// Mock useFetchApi
const mockFetchApi = {
  fetchData: jest.fn(),
  data: null,
  loading: true,
  error: null,
};

jest.mock("../hooks/useFetchApi", () => () => mockFetchApi);

describe("AdminProfile", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders user cards when data is loaded", async () => {
    mockFetchApi.loading = false;
    mockFetchApi.data = [{ username: "admin" }, { username: "Daniel" }];
    mockFetchApi.error = null;

    render(<AdminProfile />);

    expect(await screen.getByText(/AddRoleButton: admin/i)).toBeInTheDocument();
    expect(
      await screen.getByText(/DeleteUserButton: admin/i)
    ).toBeInTheDocument();

    expect(
      await screen.getByText(/AddRoleButton: daniel/i)
    ).toBeInTheDocument();
    expect(
      await screen.getByText(/DeleteUserButton: daniel/i)
    ).toBeInTheDocument();
  });

  test("displays error message when there's an error", async () => {
    mockFetchApi.loading = false;
    mockFetchApi.data = [{ username: "somebody" }];
    mockFetchApi.error = "Something went wrong";

    render(<AdminProfile />);

    expect(
      await screen.findByText(/error: something went wrong/i)
    ).toBeInTheDocument();
  });
});
