import { useEffect } from "react";
import useFetchApi from "../hooks/useFetchApi";

// eslint-disable-next-line react/prop-types
export default function UserCardElement({ username }) {
  const { fetchData, data, loading, error } = useFetchApi();

  useEffect(() => {
    fetchData(`/api/users/${username}/roles`, "GET");
  }, [fetchData, username]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
      <div className="row">
        <div className="card-body">
          <div className="card-title">{username}</div>
          Roles:
          <ul>
            {data?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
  );
}
