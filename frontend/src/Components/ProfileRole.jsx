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

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      {data?.[0] == "ADMIN" ? <AdminProfile /> : <UserProfile />}
    </div>
  );
}
