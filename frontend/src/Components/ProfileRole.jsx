import { useEffect } from "react";
import useFetchApi from "../hooks/useFetchApi";
import AdminProfile from "./AdminProfile";
import UserProfile from "./UserProfile";

export default function ProfileRole() {
  const { fetchData, data, loading, error } = useFetchApi();

  useEffect(() => {
    fetchData("/api/profile/roles");
  }, [fetchData]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      {data?.[0] == "ADMIN" ? <AdminProfile /> : <UserProfile />}
      {error && <div>Error: {error}</div>}
    </div>
  );
}
