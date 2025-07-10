import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

/**
 * Hook to redirect users based on their role.
 *
 * @param {Object} param0
 * @param {Array} param0.allowedRoles - List of roles allowed to access the page.
 */
export default function useRoleRedirect({ allowedRoles = [] } = {}) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Redirect to login if no token
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const userRole = decoded?.role;

      if (!allowedRoles.includes(userRole)) {
        navigate("/unauthorized");
      }
    } catch (error) {
      console.error("Token decoding failed:", error);
      navigate("/unauthorized");
    }
  }, [navigate, allowedRoles]);
}
