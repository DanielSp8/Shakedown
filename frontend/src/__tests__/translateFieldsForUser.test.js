/* eslint-disable no-undef */
import React from "react";
import { translateFieldsForUser } from "../helpers/translateFieldsForUser";

describe("translateFieldsForUser helper", () => {
  test("backpackName", () => {
    const field = "backpackName";
    const expectedResponse = "Backpack Name";
    expect(translateFieldsForUser(field)).toBe(expectedResponse);
  });

  test("location", () => {
    const field = "location";
    const expectedResponse = "Location";
    expect(translateFieldsForUser(field)).toBe(expectedResponse);
  });

  test("privateValue", () => {
    const field = "privateValue";
    const expectedResponse = "Keep Private?";
    expect(translateFieldsForUser(field)).toBe(expectedResponse);
  });

  test("itemName", () => {
    const field = "itemName";
    const expectedResponse = "Name of Item";
    expect(translateFieldsForUser(field)).toBe(expectedResponse);
  });

  test("category", () => {
    const field = "category";
    const expectedResponse = "Category";
    expect(translateFieldsForUser(field)).toBe(expectedResponse);
  });

  test("description", () => {
    const field = "description";
    const expectedResponse = "Description";
    expect(translateFieldsForUser(field)).toBe(expectedResponse);
  });

  test("weightLbs", () => {
    const field = "weightLbs";
    const expectedResponse = "Weight (in lbs)";
    expect(translateFieldsForUser(field)).toBe(expectedResponse);
  });
  test("weightOz", () => {
    const field = "weightOz";
    const expectedResponse = "Weight (in oz)";
    expect(translateFieldsForUser(field)).toBe(expectedResponse);
  });
  test("price", () => {
    const field = "price";
    const expectedResponse = "Price";
    expect(translateFieldsForUser(field)).toBe(expectedResponse);
  });
  test("Add Role", () => {
    const field = "Add Role";
    const expectedResponse = "Add Role";
    expect(translateFieldsForUser(field)).toBe(expectedResponse);
  });
  test("null return", () => {
    const field = "All other fields";
    expect(translateFieldsForUser(field)).toBeNull;
  });
});
