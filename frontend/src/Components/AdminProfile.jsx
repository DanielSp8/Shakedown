import React, { useState, useEffect } from "react";
import useFetchApi from "../hooks/useFetchApi";
import UserCardElement from "./UserCardElement";
import Modal from "./Modal";
import AddRoleButton from "./AddRoleButton";

export default function AdminProfile() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { fetchData, data, loading, error } = useFetchApi();

  const triggerRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  useEffect(() => {
    fetchData("/api/users");
  }, [fetchData, refreshKey]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="d-flex flex-wrap gap-3 drop-more">
      {data?.map((val, key) => {
        return (
          <div
            className="card border-dark rounded shadow-lg user-card"
            key={key}
          >
            <UserCardElement username={val?.username} />
            <AddRoleButton
              username={val?.username}
              onSuccess={triggerRefresh}
            />

            {error && <div>Error: {error}</div>}
          </div>
        );
      })}
    </div>
  );
}
