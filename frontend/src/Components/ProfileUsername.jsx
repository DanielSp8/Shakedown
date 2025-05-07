import useFetchApi from "../hooks/useFetchApi";

export default function Profile() {
  const { data, loading, error } = useFetchApi("/api/profile");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="card border-dark rounded p-2 shadow-lg half-size-width justify-content-center align-items-center">
      <div className="card-title special-title-with-shadow large-title subTitle text-spacing">
        Profile
      </div>
      <div className="card-body text-center">
        <div className="fs-3 special-title-with-shadow text-spacing">
          Username: <p className="user-fields">{data.username}</p>
        </div>
      </div>
    </div>
  );
}
