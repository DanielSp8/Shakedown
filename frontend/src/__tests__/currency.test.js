/* eslint-disable no-undef */
import { formatCurrency } from "../helpers/currency";

describe("currency, helper", () => {
  describe("formatCurrency, should return a valid US currency format", () => {
    it("return a valid US currency", () => {
      expect(formatCurrency(14.99)).toBe("$14.99");
      expect(formatCurrency(103.91)).toBe("$103.91");
    });
  });
});
