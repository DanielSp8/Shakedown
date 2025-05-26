/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import useFetchApi from "./useFetchApi";

export default function useUsername() {
  const { fetchData, data, loading, error } = useFetchApi();

  const [username, setUsername] = useState([]);

  useEffect(() => {
    fetchData("/api/profile");
  }, []);

  useEffect(() => {
    if (data && data.username) {
      setUsername(data.username);
    }
  }, [data]);

  return { username };
}
