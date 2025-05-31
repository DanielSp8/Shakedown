import React, { useState, useEffect } from "react";
import useFetchApi from "../../hooks/useFetchApi";
import UserCardElement from "./UserCardElement";
import AddRoleButton from "../buttons/AddRoleButton";
import DeleteUserButton from "../buttons/DeleteUserButton";
import "../../assets/css/card.css";

export default function AdminProfile() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { fetchData, data, loading, error } = useFetchApi();
  const [showButton, setShowButton] = useState(true);

  const triggerRefresh = () => {
    setShowButton(true);
    setRefreshKey((prev) => prev + 1);
  };

  useEffect(() => {
    fetchData("/api/users");
  }, [fetchData, refreshKey]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="d-flex gap-5">
      {data?.map((val, key) => {
        return (
          <div
            className="card border-dark rounded card-fit card-with-background fixed-card-size"
            key={key}
          >
            <div className="card-body">
              <UserCardElement
                otherUsername={val?.username}
                onSuccess={triggerRefresh}
              />
              <div className="d-flex justify-content-end gap-2 mt-5">
                <AddRoleButton
                  setShowButton={setShowButton}
                  showButton={showButton}
                  otherUsername={val?.username}
                  onSuccess={triggerRefresh}
                />
                <DeleteUserButton
                  setShowButton={setShowButton}
                  showButton={showButton}
                  otherUsername={val?.username}
                  onSuccess={triggerRefresh}
                />
              </div>

              {error && (
                <div className="text-danger">
                  Error: {error}, please try again...
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
