import { useState } from "react";
import useFetchApi from "../hooks/useFetchApi";

function handleSubmitRole(event) {
  event.preventDefault();
}

// eslint-disable-next-line no-unused-vars
export default function AddRoleToUser({ username }) {
  // const {data, loading, error} = useFetchApi(`/api/users/${username}/roles`, "POST", role)
  const [role, setRole] = useState("");

  return (
    <>
      <form onSubmit={handleSubmitRole}>
        <div>
          <label className="form-label" htmlFor="role">
            Add role
          </label>
          <input
            className="form-control"
            id="role"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>

        {/* {error && <p className="error-message mt-5">{error}</p>} */}
      </form>
    </>
  );
}
