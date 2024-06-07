import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignInBox() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let data = JSON.stringify({
        username: formData.username,
        password: formData.password,
      });

      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      toast.success("Đăng nhập thành công");
      var expiredTime = new Date(
        new Date().getTime() + response.data.expiresIn
      );
      Cookies.set("user", response.data.token, {
        expires: expiredTime,
      });
      localStorage.setItem("username", response.data.username);
      Cookies.set('role', response.data.authorities[0].authority, { expires: expiredTime });
      navigate("/admin/cotes");
    } catch (error) {
      toast.error("Đăng nhập thất bại");
      throw error;
    }
  };

  const changeHandler = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="auth-main-container">
        <div className="auth-logo">
          <img
            src={require("../../assets/image/logo.jpg")}
            alt=""
          />
        </div>
        <div className="signin-container">
          <form
            action="#"
            className="auth-form"
            onSubmit={submitHandler}
          >
            <p className="greeting">
              Cùng xây dựng một ngày làm việc vui vẻ nhé!
            </p>

            <input
              type="text"
              className="username"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={changeHandler}
            />
            <input
              type="password"
              className="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={changeHandler}
            />
            <button className="signin-btn">Đăng nhập</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignInBox;
