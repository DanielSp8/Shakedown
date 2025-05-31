/* eslint-disable no-undef */
import React from "react";
import { render, screen } from "@testing-library/react";
import DisplaySearchedGearItems from "../components/search/DisplaySearchedGearItems";

// Mock custom hooks
jest.mock("../hooks/useUsername", () => ({
  __esModule: true,
  default: () => ({ username: "testUser" }),
}));

jest.mock("../hooks/useRole", () => ({
  __esModule: true,
  default: () => ({ role: ["USER"] }),
}));

// Mock the currency formatter
jest.mock("../helpers/currency", () => ({
  formatCurrency: jest.fn((val) => `$${val.toFixed(2)}`),
}));

describe("DisplaySearchedGearItems", () => {
  test("doesn't render table if displayTable is false", () => {
    render(<DisplaySearchedGearItems data={[]} displayTable={false} />);

    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  test("renders table with headers of table when displayTable is true", () => {
    render(<DisplaySearchedGearItems data={[]} displayTable={true} />);

    expect(screen.getByText("Item")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
  });

  test("shows public data, but hides private data from non-admin", () => {
    const mockData = [
      {
        itemName: "Tent",
        category: "Shelter",
        description: "2-Person Tent",
        weightLbs: 3,
        weightOz: 4,
        price: 155.55,
        privateValue: false,
        ownerUsername: "someone",
      },
      {
        itemName: "Jetboil Stove",
        category: "Cooking",
        description: "A great stove!",
        weightLbs: 1,
        weightOz: 8,
        price: 125.55,
        privateValue: true,
        ownerUsername: "Danielson",
      },
    ];

    render(<DisplaySearchedGearItems data={mockData} displayTable={true} />);

    expect(screen.getByText("Tent")).toBeInTheDocument();
    expect(screen.queryByText("Jetboil Stove")).not.toBeInTheDocument();
  });

  test("uses formatCurrency to render price with $ format", () => {
    const mockData = [
      {
        itemName: "Marmot Backpack",
        category: "Backpack",
        description: "A wonderful, comfortable, large backpack!",
        weightLbs: 3,
        weightOz: 9,
        price: 299,
        privateValue: false,
        ownerUsername: "Danielson",
      },
    ];

    render(<DisplaySearchedGearItems data={mockData} displayTable={true} />);
    expect(screen.getByText("$299.00")).toBeInTheDocument();
  });
});
