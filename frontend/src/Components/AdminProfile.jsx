import useFetchApi from "../hooks/useFetchApi";
import UserCardElement from "./UserCardElement";

export default function AdminProfile() {
  const { data, loading, error } = useFetchApi("/api/users");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {data.map((val, key) => {
        return (
          <div key={key}>
            <UserCardElement username={val.username} />
          </div>
        );
      })}
    </div>
  );
}
