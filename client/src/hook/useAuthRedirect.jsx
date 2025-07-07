import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthRedirect = () => {
  const navigate = useNavigate();
    const baseURL = process.env.REACT_APP_API_URL;


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const validateToken = async () => {
      try {
        const response = await fetch(`${baseURL}/api/auth/validate`, {
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
