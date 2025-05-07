import useFetchApi from "../hooks/useFetchApi";
import AdminProfile from "./AdminProfile";
import UserProfile from "./UserProfile";

export default function ProfileRole() {
  const { data, loading, error } = useFetchApi("/api/profile/roles");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      {data[0] == "ADMIN" ? <AdminProfile /> : <UserProfile />}
    </div>
  );
}
