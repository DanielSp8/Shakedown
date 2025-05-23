/* eslint-disable no-undef */
import React from "react";
import { renderHook, act } from "@testing-library/react";
import useFetchApi from "../hooks/useFetchApi";

describe("useFetchApi", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: "Success" }),
    });
    localStorage.setItem("token", "test-token");
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("Successful GET Request", async () => {
    const { result } = renderHook(() => useFetchApi());

    await act(() => result.current.fetchData("/api/test"));

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toEqual({ message: "Success" });
  });
});
