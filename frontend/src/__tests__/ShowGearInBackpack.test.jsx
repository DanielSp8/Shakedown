/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-undef */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ShowGearInBackpack from "../Components/ShowGearInBackpack";

// Mock useFetchApi
const mockFetchApi = {
  fetchData: jest.fn(),
  data: null,
  loading: true,
  error: null,
};
jest.mock("../hooks/useFetchApi", () => () => mockFetchApi);

// Mock AddGearButton
jest.mock("../Components/AddGearButton", () => ({ backpackId }) => (
  <div>AddGearButton: {backpackId}</div>
));

// Mock UpdateGearButton
jest.mock("../Components/UpdateGearButton", () => (props) => (
  <div>UpdateGearButton</div>
));

// Mock DeleteGearButton
jest.mock("../Components/DeleteGearItemButton", () => (props) => {
  <div>DeleteGearItemButton</div>;
});

// Mock useUsername hook
jest.mock("../hooks/useUsername", () => ({
  __esModule: true,
  default: jest.fn(),
}));
import useUsername from "../hooks/useUsername";

// Mock useRole hook
jest.mock("../hooks/useRole", () => ({
  __esModule: true,
  default: jest.fn(),
}));
import useRole from "../hooks/useRole";

// Mock setDisplayGear
const setDisplayGear = jest.fn();

describe("ShowGearInBackpack", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  useUsername.mockReturnValue("Daniel");
  useRole.mockReturnValue({ role: ["ADMIN"] });

  test("renders Loading... if loading is true", () => {
    mockFetchApi.loading = true;
    render(<ShowGearInBackpack />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("table renders with data", () => {
    const mockData = [
      {
        itemId: 7,
        itemName: "Sandals",
        category: "Footwear",
        description: "Very comfortable to have at camp!",
        weightLbs: 1,
        weightOz: 6,
        price: 55,
        backpackId: 3,
        privateValue: false,
      },
    ];
    mockFetchApi.data = mockData;
    mockFetchApi.loading = false;
    mockFetchApi.error = null;

    render(<ShowGearInBackpack />);

    expect(screen.getByText("Sandals")).toBeInTheDocument();
    expect(screen.getByText("Footwear")).toBeInTheDocument();
    expect(
      screen.getByText("Very comfortable to have at camp!")
    ).toBeInTheDocument();
  });

  test("Back to Backpacks button returns setDisplayGear(false) when clicked", () => {
    const mockData = [
      {
        itemId: 7,
        itemName: "Sandals",
        category: "Footwear",
        description: "Very comfortable to have at camp!",
        weightLbs: 1,
        weightOz: 6,
        price: 55,
        backpackId: 3,
        privateValue: false,
      },
    ];
    mockFetchApi.data = mockData;
    mockFetchApi.loading = false;
    mockFetchApi.error = null;

    render(<ShowGearInBackpack setDisplayGear={setDisplayGear} />);

    fireEvent.click(screen.getByRole("button", { name: "Back to Backpacks" }));
    expect(setDisplayGear).toHaveBeenCalledWith(false);
  });
});
