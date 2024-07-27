import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getCookie } from "../utils/cookie";
import { ACCESSTOKEN_KEY } from "../config";

const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (getCookie(ACCESSTOKEN_KEY)) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
