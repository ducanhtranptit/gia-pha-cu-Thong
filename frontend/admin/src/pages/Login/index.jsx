import { Form } from "react-bootstrap";
import "./style.css";
import { useState } from "react";
import AuthAPI from "../../api/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCookie } from "../../utils/cookie";
import { ACCESSTOKEN_KEY, REFRESHTOKEN_KEY } from "../../config";
import { useNavigate } from "react-router-dom";

function Login() {
  const initialState = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.trim()) {
      toast.error("Vui lòng nhập email");
      return;
    }
    if (!formData.password.trim()) {
      toast.error("Vui lòng nhập mật khẩu");
      return;
    }
    const response = await AuthAPI.login(formData);
    if (response?.status !== 200) {
      toast.error("Tài khoản hoặc mật khẩu không chính xác");
      return;
    }
    if (response?.data) {
      setCookie(ACCESSTOKEN_KEY, response.data.accessToken, { expires: 0.5 });
      setCookie(REFRESHTOKEN_KEY, response.data.refreshToken, { expires: 1 });
      navigate("/");
    }
  };
  return (
    <div className="login-page">
      <ToastContainer />
      <div className="container">
        <div className="form-login">
          <span className="title-login">Đăng nhập</span>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Vui lòng nhập email"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Vui lòng nhập mật khẩu"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
              />
            </Form.Group>

            <button type="submit" className="btn btn-primary mt-4">
              Đăng nhập
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
