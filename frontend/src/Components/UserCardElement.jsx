import React, { useEffect } from "react";
import useFetchApi from "../hooks/useFetchApi";
import DeleteRoleButton from "./DeleteRoleButton";

// eslint-disable-next-line react/prop-types
export default function UserCardElement({ username, onSuccess }) {
  const { fetchData, data, loading, error } = useFetchApi();

  useEffect(() => {
    fetchData(`/api/users/${username}/roles`, "GET");
  }, [fetchData, username]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="row">
      <div className="card-body">
        <div className="card-title">{username}</div>
        Roles:
        <ul>
          {data?.map((item, index) => (
            <li key={index}>
              {item}
              <DeleteRoleButton
                username={username}
                role={item}
                onSuccess={onSuccess}
              />
            </li>
          ))}
        </ul>
      </div>
      {error && <div>Error: {error}, please retry.</div>}
    </div>
  );
}
