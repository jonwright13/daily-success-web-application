import { useNavigate, useLocation } from "react-router-dom";

const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const toHome = () => {
    navigate("/");
  };

  const getLocation = location.pathname;

  return {
    toHome,
    getLocation,
  };
};

export default useNavigation;
