import { useNavigate } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import { getCookie, removeCookie } from "../utils/cookie";
import { ACCESSTOKEN_KEY, REFRESHTOKEN_KEY } from "../config";
import UserAPI from "../api/user";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useLayoutEffect(() => {
    const handleGetProfile = async () => {
      const response = await UserAPI.getProfile();
      if (!response.data || response?.status !== 200) {
        removeCookie(ACCESSTOKEN_KEY);
        removeCookie(REFRESHTOKEN_KEY);
        navigate("/login");
      }
      setShow(true);
    };
    if (!getCookie(ACCESSTOKEN_KEY)) {
      navigate("/login");
    }
    handleGetProfile();
  }, [navigate]);

  return show && <div>{children}</div>;
};

export default PrivateRoute;
