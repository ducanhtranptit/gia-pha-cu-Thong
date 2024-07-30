import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCookie } from "../utils/cookie";
import { ACCESSTOKEN_KEY } from "../config";
import UserAPI from "../api/user";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleGetProfile = async () => {
      await UserAPI.getProfile();
      setShow(true);
      if (!getCookie(ACCESSTOKEN_KEY)) {
        navigate("/login");
      }
    };
    handleGetProfile();
  }, [navigate]);

  return show && <div>{children}</div>;
};

export default PrivateRoute;
