/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import useFetchApi from "./useFetchApi";

export default function useUserRoles({ otherUsername }) {
  const { fetchData, data, loading, error } = useFetchApi();
  const [roles, setRoles] = useState(null);

  useEffect(() => {
    fetchData(`/api/users/${otherUsername}/roles`, "GET");
  }, [fetchData, otherUsername]);

  useEffect(() => {
    if (data) {
      setRoles(data);
    }
  }, [data]);

  return { roles };
}
