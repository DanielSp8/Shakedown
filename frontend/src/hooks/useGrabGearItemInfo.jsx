/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import useFetchApi from "./useFetchApi";

export default function useGrabGearItemInfo(itemId) {
  const { fetchData, data, loading, error } = useFetchApi();
  const [gearItem, setGearItem] = useState(null);

  useEffect(() => {
    fetchData(`/api/gearlists/${itemId}`);
  }, []);

  useEffect(() => {
    if (data) {
      setGearItem(data);
    }
  }, [data]);

  return { gearItem };
}
