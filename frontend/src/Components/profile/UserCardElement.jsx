import React, { useEffect } from "react";
import useFetchApi from "../../hooks/useFetchApi";
import DeleteRoleButton from "../buttons/DeleteRoleButton";
import useUsername from "../../hooks/useUsername";
import ChangeOtherPasswordButton from "../buttons/ChangeOtherPasswordButton";
import DropdownRole from "../elements/DropdownRole";

// eslint-disable-next-line react/prop-types
export default function UserCardElement({ otherUsername, onSuccess }) {
  const { fetchData, data, loading, error } = useFetchApi();
  const { username } = useUsername();

  const verifyLoggedInUsername = (usernameToCheck) => {
    if (username === usernameToCheck) {
      return "Logged In:";
    } else {
      return "Username:";
    }
  };

  useEffect(() => {
    fetchData(`/api/users/${otherUsername}/roles`, "GET");
  }, [fetchData, otherUsername]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="row">
      <div className="card-body">
        <div className="card-title">
          {verifyLoggedInUsername(otherUsername)}{" "}
          <span className="card-body-text">{otherUsername}</span>
        </div>
        Roles:
        <ul>
          {data?.map((item, index) => (
            <li key={index}>
              {item}
              <DeleteRoleButton
                otherUsername={otherUsername}
                role={item}
                onSuccess={onSuccess}
              />
            </li>
          ))}
        </ul>
        {username !== otherUsername && (
          <ChangeOtherPasswordButton
            otherUsername={otherUsername}
            onSuccess={onSuccess}
          />
        )}
      </div>
      {error && <div>Error: {error}, please retry.</div>}
    </div>
  );
}
