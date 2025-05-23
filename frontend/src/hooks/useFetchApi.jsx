import { useState, useCallback } from "react";

export default function useFetchApi() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async (
      URL,
      method = "GET",
      headerContent = "application/json",
      body = null
    ) => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        const options = {
          method,
          headers: {
            "Content-Type": headerContent,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };

        // Check of how to post the value (no "" for role add, or stringify some others)
        //  This is primarily for formatting purposes
        if (
          headerContent !== "application/json" &&
          (method === "POST" || method === "PUT")
        ) {
          options.body = body;
        } else if (body && (method === "POST" || method === "PUT")) {
          options.body = JSON.stringify(body);
        }

        const response = await fetch(URL, options);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const json = await response.json();
        setData(json);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { fetchData, data, loading, error };
}
