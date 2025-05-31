/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AdminProfile from "../components/profile/AdminProfile";

// Mock other components being used
jest.mock("../components/profile/UserCardElement", () => ({ username, onSuccess }) => {
  return (
    <>
      <div>UserCard: {username}</div>
      <button onClick={() => onSuccess()}>Trigger Refresh</button>
    </>
  );
});

// Mock AddRoleButton
jest.mock("../components/buttons/AddRoleButton", () => ({ username }) => (
  <div>AddRoleButton: {username}</div>
));

// Mock DeleteUserButton
jest.mock("../components/buttons/DeleteUserButton", () => ({ username }) => (
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

  test("displays error message when there's an error", async () => {
    mockFetchApi.loading = false;
    mockFetchApi.data = [{ username: "somebody" }];
    mockFetchApi.error = "Something went wrong";

    render(<AdminProfile />);

    expect(
      await screen.findByText(/error: something went wrong/i)
    ).toBeInTheDocument();
  });

  test("simulate trigger refresh function", () => {
    render(<AdminProfile />);

    expect(mockFetchApi.fetchData).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: /trigger refresh/i }));

    expect(mockFetchApi.fetchData).toHaveBeenCalledTimes(2);
  });

  test("renders loading indicator...", () => {
    mockFetchApi.loading = true;
    mockFetchApi.data = null;
    mockFetchApi.error = null;

    render(<AdminProfile />);

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    expect(screen.queryByText("AddRoleButton")).not.toBeInTheDocument();
  });
});
