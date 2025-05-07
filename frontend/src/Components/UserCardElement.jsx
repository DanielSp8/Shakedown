import useFetchApi from "../hooks/useFetchApi";

// eslint-disable-next-line react/prop-types
export default function UserCardElement({ username }) {
  const { data, loading, error } = useFetchApi(`/api/users/${username}/roles`);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="card border-dark rounded shadow-lg row">
      <div className="row">
        <div className="card-body">
          <div className="card-title">{username}</div>
          Roles:
          <ul>
            {data.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
