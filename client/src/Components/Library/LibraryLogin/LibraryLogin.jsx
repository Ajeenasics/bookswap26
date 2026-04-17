import React, { useEffect, useState } from "react";
import img from "../../../Assets/clublogin.png"
import  "../../Clubs/ClubLogin.css"
import { Link, useNavigate } from "react-router-dom";
import { BsArrowClockwise, BsEye, BsEyeSlash } from "react-icons/bs";
import axiosInstance from "../../../BaseUrl";
import { toast } from "react-toastify";


function LibraryLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captchaText, setCaptchaText] = useState("");
  const [userCaptchaInput, setUserCaptchaInput] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      document.getElementById("alertuser").innerHTML = "Email is required";
      return;
    }

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!validateEmail(email)) {
      document.getElementById("alertuser").innerHTML = "Please enter a valid email";
      return;
    }

    if (password.trim() === "") {
      document.getElementById("alertuser").innerHTML = "Password is required";
      return;
    }

    if (userCaptchaInput !== captchaText) {
      document.getElementById("alertuser").innerHTML = "Invalid CAPTCHA. Please try again.";
      return;
    }

    try {
      const result = await axiosInstance.post("/librarylogin", {
        email,
        password,
      });

      if (result.data.token) {
        toast.success("Login successful!");
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("libraryid", result.data.id);
        localStorage.setItem("liblogin",true)
        navigate("/library_home");
      } else {
        document.getElementById("alertuser").innerHTML = result.data.message || "Login failed";
      }
    } catch (err) {
      console.error("Login error", err);
      document.getElementById("alertuser").innerHTML = err.response?.data?.message || "Login failed";
    }
  };

  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <div className="club_login ">
      <div className="container ">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-6">
            <img src={img} alt="login visual" className="img-fluid" />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <p className="club_login_title">Library Login</p>
            <form onSubmit={handleLogin}>
              <div className="row mt-4">
                <div className="col-12">
                  <div className="club_login_inputs mt-4">
                    <input
                      type="email"
                      placeholder="Email"
                      className="mb-5"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="position-relative d-inline-block">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ paddingRight: "40px" }}
                      />
                      <span 
                         onClick={() => setShowPassword(!showPassword)}
                         style={{ position: "absolute", right: "15px", top: "20px", cursor: "pointer", zIndex: 10 }}
                      >
                        {showPassword ? <BsEye /> : <BsEyeSlash />}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 club_login_forgotpass mt-3">
                    <Link to="/library-forgotpassword">Forgot Password?</Link>
                  </div>
                </div>

                <p className="alert text-center mt-2" id="alertuser"></p>

                <div className="col-6 club_login_card">
                  <div className="captchaborder mt-3">
                    <div className="card-body club_login_captcha">
                      <h5 className="card-title">{captchaText}</h5>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={generateCaptcha}
                      >
                        <BsArrowClockwise />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="club_login_inputs mt-4">
                  <input
                    type="text"
                    placeholder="Enter the Captcha"
                    className="mb-4"
                    value={userCaptchaInput}
                    onChange={(e) => setUserCaptchaInput(e.target.value)}
                  />
                </div>

                <div className="club_login_button">
                  <button className="btn btn-primary" type="submit">
                    Login
                  </button>
                </div>
              </div>
            </form>
            <div className="col-12 club_signin_link mt-3">
              <p>
                Are you a new user?{" "}
                <Link to="/library-register">SignUp</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LibraryLogin;
