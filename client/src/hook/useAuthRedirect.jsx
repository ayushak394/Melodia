import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const validateToken = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/auth/validate", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!data.valid) {
          localStorage.removeItem("token");
          navigate("/");
        }
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    validateToken();
  }, [navigate]);
};

export default useAuthRedirect;
