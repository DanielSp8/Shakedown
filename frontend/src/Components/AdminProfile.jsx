import { useEffect } from "react";
import useFetchApi from "../hooks/useFetchApi";
import UserCardElement from "./UserCardElement";

export default function AdminProfile() {
  const { fetchData, data, loading, error } = useFetchApi();

  useEffect(() => {
    fetchData("/api/users");
  }, [fetchData]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="d-flex flex-wrap gap-3 drop-more">
      {data?.map((val, key) => {
        return (
          <div
            className="card border-dark rounded shadow-lg user-card"
            key={key}
          >
            <UserCardElement username={val.username} />
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                addRoleOnClick(val.username);
              }}
            >
              Add Role
            </button>
          </div>
        );
      })}
    </div>
  );
}
