// Style the card(s) uniquely for AdminProfile with CSS once everything is in them!
import React, { useState, useEffect } from "react";
import useFetchApi from "../../hooks/useFetchApi";
import UserCardElement from "./UserCardElement";
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
            className="card border-dark rounded card-fit card-with-background"
            key={key}
          >
            <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
              <UserCardElement
                otherUsername={val?.username}
                onSuccess={triggerRefresh}
              />

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
