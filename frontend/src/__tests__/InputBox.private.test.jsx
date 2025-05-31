/* eslint-disable no-undef */

// Mocks are placed at the top of this file, to ensure that they are called first
jest.mock("../helpers/checkForDecimalField", () => ({
  checkForDecimalField: () => false,
}));
jest.mock("../helpers/translateFieldsForUser", () => ({
  translateFieldsForUser: () => "privateValue",
}));
import React from "react";
import { render, screen } from "@testing-library/react";
import InputBox from "../components/elements/InputBox";

describe("InputBox when field is privateValue", () => {
  const mockFormData = {
    backpackId: 23,
    backpackName: "Grandview Journeys",
    location: "Grandview, MO",
    privateValue: true,
  };

  const handleChange = jest.fn();

  test("renders a checkbox", () => {
    render(
      <InputBox
        field={"privateValue"}
        formData={mockFormData}
        handleChange={handleChange}
      />
    );

    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  test("checkbox is checked (due to privateData = true", () => {
    render(
      <InputBox
        field={"privateValue"}
        formData={mockFormData}
        handleChange={handleChange}
      />
    );

    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  test("checkbox is not checked (due to privateData = false", () => {
    const mockFormData = {
      backpackId: 23,
      backpackName: "Grandview Journeys",
      location: "Grandview, MO",
      privateValue: false,
    };
    render(
      <InputBox
        field={"privateValue"}
        formData={mockFormData}
        handleChange={handleChange}
      />
    );

    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });
});
