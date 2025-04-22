import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const [isValid, setIsValid] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        const response = await fetch("/users/admin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (err) {
        setIsValid(false);
      }
    };

    checkToken();
  }, []);

  if (isValid === null) {
    return <p>Verifying authentication...</p>;
  }

  if (!isValid) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
