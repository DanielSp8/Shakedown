/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import React from "react";
import Backpack from "../Components/Backpack";
import { render, screen, fireEvent } from "@testing-library/react";

// Mock custom hooks being used
jest.mock("../hooks/useFetchApi", () => () => mockFetchApi);
jest.mock("../hooks/useUsername", () => () => ({ username: "daniel" }));
jest.mock("../hooks/useRole", () => () => ({ role: ["USER"] }));

// Mock other components being used
jest.mock("../Components/DeleteBackpackButton", () => ({ backpackName }) => (
  <div>Delete: {backpackName}</div>
));

// Mock useFetchApi
const mockFetchApi = {
  fetchData: jest.fn(),
  data: [],
  loading: true,
  error: null,
};

describe("Backpack", () => {
  const setDisplayGear = jest.fn();
  const setSelectedBackpackId = jest.fn();
  const onSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows loading message", () => {
    render(
      <Backpack
        setDisplayGear={setDisplayGear}
        setSelectedBackpackId={setSelectedBackpackId}
        refreshKey={0}
        onSuccess={onSuccess}
      />
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("shows row of backpack info", () => {
    mockFetchApi.loading = false;
    mockFetchApi.data = [
      {
        backpackId: 1,
        backpackName: "Public Backpack",
        location: "The Ozarks",
        privateValue: false,
        ownerUsername: "Simon",
      },
    ];
    mockFetchApi.error = null;

    render(
      <Backpack
        setDisplayGear={setDisplayGear}
        setSelectedBackpackId={setSelectedBackpackId}
        refreshKey={0}
        onSuccess={onSuccess}
      />
    );

    expect(screen.getByText("Public Backpack")).toBeInTheDocument();
    expect(screen.getByText("The Ozarks")).toBeInTheDocument();
    expect(screen.getByText("Simon")).toBeInTheDocument();
    expect(screen.getByText(/delete: public backpack/i)).toBeInTheDocument();
  });

  test("hides a private backpack if not admin or owner of it", () => {
    mockFetchApi.loading = false;
    mockFetchApi.data = [
      {
        backpackId: 2,
        backpackName: "Private Backpack",
        location: "My Backyard",
        privateValue: true,
        ownerUsername: "Danielson",
      },
    ];
    mockFetchApi.error = null;

    render(
      <Backpack
        setDisplayGear={setDisplayGear}
        setSelectedBackpackId={setSelectedBackpackId}
        refreshKey={0}
        onSuccess={onSuccess}
      />
    );

    expect(screen.queryByText("Private Backpack")).not.toBeInTheDocument();
    expect(screen.queryByText("My Backyard")).not.toBeInTheDocument();
    expect(screen.queryByText("Danielson")).not.toBeInTheDocument();
  });

  test("activates and opens display gear component with info", () => {
    mockFetchApi.loading = false;
    mockFetchApi.data = [
      {
        backpackId: 91,
        backpackName: "Philmont 2029",
        location: "Cimarron, NM",
        privateValue: false,
        ownerUsername: "Daniel",
      },
    ];
    mockFetchApi.error = null;

    render(
      <Backpack
        setDisplayGear={setDisplayGear}
        setSelectedBackpackId={setSelectedBackpackId}
        refreshKey={0}
        onSuccess={onSuccess}
      />
    );

    const showGearButton = screen.getByRole("button", { name: /show gear/i });
    fireEvent.click(showGearButton);

    expect(setDisplayGear).toHaveBeenCalledWith(true);
    expect(setSelectedBackpackId).toHaveBeenCalledWith(91);
  });

  test("displays the error message, if an error is encountered", () => {
    mockFetchApi.error = "Failed to load backpacks";
    mockFetchApi.loading = false;
    mockFetchApi.data = [];

    render(
      <Backpack
        setDisplayGear={setDisplayGear}
        setSelectedBackpackId={setSelectedBackpackId}
        refreshKey={0}
        onSuccess={onSuccess}
      />
    );

    expect(
      screen.getByText(/error: failed to load backpacks. Please try again.../i)
    ).toBeInTheDocument();
  });
});
