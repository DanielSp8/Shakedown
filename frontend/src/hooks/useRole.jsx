/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import useFetchApi from "./useFetchApi";

export default function useRole() {
  const { fetchData, data, loading, error } = useFetchApi();

  const [role, setRole] = useState([]);

  useEffect(() => {
    fetchData("/api/profile/roles");
  }, []);

  useEffect(() => {
    if (data) {
      console.log("data: ", data);
      setRole(data);
    }
  }, [data]);

  return { role };
}
