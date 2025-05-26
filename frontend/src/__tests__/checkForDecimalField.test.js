import React from "react";
import { checkForDecimalField } from "../helpers/checkForDecimalField";

describe("checkForDecimal helper", () => {
  test("verifying true response for weightLbs", () => {
    const field = "weightLbs";
    expect(checkForDecimalField(field)).toBeTrue;
  });

  test("verifying true response for weightOz", () => {
    const field = "weightOz";
    expect(checkForDecimalField(field)).toBeTrue;
  });

  test("verifying true response for price", () => {
    const field = "price";
    expect(checkForDecimalField(field)).toBeTrue;
  });

  test("verify all other fields return false", () => {
    const field = "All other fields";
    expect(checkForDecimalField(field)).toBeFalse;
  });
});
