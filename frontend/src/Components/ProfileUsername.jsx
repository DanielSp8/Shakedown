import { useEffect } from "react";
import useFetchApi from "../hooks/useFetchApi";

export default function Profile() {
  const { fetchData, data, loading, error } = useFetchApi();

  useEffect(() => {
    fetchData("/api/profile");
  }, [fetchData]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="card border-dark rounded shadow-lg bring-up-some">
      <div className="card-body">
        <div className="fs-3 user-fields">Username: {data?.username}</div>
      </div>
    </div>
  );
}
