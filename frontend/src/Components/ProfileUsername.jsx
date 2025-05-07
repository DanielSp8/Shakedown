import useFetchApi from "../hooks/useFetchApi";

export default function Profile() {
  const { data, loading, error } = useFetchApi("/api/profile");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="card border-dark rounded shadow-lg bring-up-some">
      <div className="card-body">
        <div className="fs-3 user-fields">Username: {data.username}</div>
      </div>
    </div>
  );
}
