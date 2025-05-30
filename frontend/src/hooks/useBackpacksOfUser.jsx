/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import useFetchApi from "./useFetchApi";

export default function useBackpacksOfUser() {
  const { fetchData, data, loading, error } = useFetchApi();
  const [backpacks, setBackpacks] = useState([]);

  useEffect(() => {
    fetchData(`/api/backpacks/username`);
  }, []);

  useEffect(() => {
    if (data) {
      setBackpacks(data);
    }
  }, [data]);

  return { backpacks };
}
