import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { loginAPI, registerAPI } from "../services/allApi";
import "react-toastify/dist/ReactToastify.css";

function Auth({ register }) {

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",            
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  const validate = () => {
    const newErrors = {};
  
    // Username validation — only when registering
    if (register) {
      if (!userDetails.username.trim()) {
        newErrors.username = "Username is required";
      } else if (userDetails.username.length < 3) {
        newErrors.username = "Username must be at least 3 characters";
      }
    }
  
    // Email validation
    if (!userDetails.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userDetails.email)) {
      newErrors.email = "Email is invalid";
    }
  
    // Password validation
    if (!userDetails.password) {
      newErrors.password = "Password is required";
    } else if (userDetails.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
  
    return newErrors;
  };
  

  const handleRegister = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      if (register) {
        // Registration: username, email, and password must be filled
        if (
          !userDetails.username.trim() &&
          !userDetails.email.trim() &&
          !userDetails.password.trim()
        ) {
          toast.error("Username, Email, and Password are required!");
        } else {
          const errorMessages = Object.values(validationErrors).join(" | ");
          toast.error(errorMessages);
        }
      } else {
        // Login: only email and password are required
        if (
          !userDetails.email.trim() &&
          !userDetails.password.trim()
        ) {
          toast.error("Email and Password are required!");
        } else {
          const errorMessages = Object.values(validationErrors).join(" | ");
          toast.error(errorMessages);
        }
      }
      return;
    }
    

    const { username, email, password } = userDetails;

    try {
      const result = await registerAPI({ username, email, password });
      console.log(result);

      if (result.status === 200) {
        toast.success("Registration completed successfully");
        setUserDetails({ username: "", email: "", password: "" });
        navigate("/login");
      } else if (result.response && result.response.status === 409) {
        toast.warning(result.response.data);
        setUserDetails({ username: "", email: "", password: "" });
      } else {
        toast.error(
          (result.response && result.response.data) ||
            "Unexpected error occurred"
        );
        setUserDetails({ username: "", email: "", password: "" });
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
    }
  };

  const handleLogin = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);

    // Stop if there are any errors
    if (Object.keys(validationErrors).length > 0) {
      return; // Errors will show under inputs
    }

    const { email, password } = userDetails;

    try {
      const result = await loginAPI({ email, password });

      if (result.status === 200) {
        toast.success("Login Successfully");

        sessionStorage.setItem(
          "existingUser",
          JSON.stringify(result.data.user)
        );
        sessionStorage.setItem("token", result.data.token);

        setTimeout(() => navigate("/"), 1500);
      } else if (result.status === 401 || result.status === 404) {
        toast.warning(result.response?.data || "Invalid credentials");
        setUserDetails({ username: "", email: "", password: "" });
      } else {
        toast.error("Server error! Please try again...");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Something went wrong! Please try again...");
    }
  };

  const handleEye = () => setShowPassword(!showPassword);
useEffect(()=>{


  
  setUserDetails({
    username: "",
    email: "",
    password: "",
  });
},[])
  return (
    <div
      id="auth_maindiv"
      className="flex justify-center items-center bg-[#F5F1E9] h-screen"
    >
      <div className="md:grid grid-cols-3 w-full p-5 md:p-0">
        <div></div>
        <div className="flex justify-center items-center flex-col">
          <form className="w-full bg-[#2C6E49] p-10 flex justify-center items-center flex-col">
            <div className="w-[80px] h-[80px] border border-white rounded-full flex justify-center items-center">
              <img src="/images/logo-bg.jpg" className="rounded-full" />
            </div>
            <h1 className="text-white mt-5 text-3xl mb-5">
              {register ? "Register" : "Login"}
            </h1>

            {register && (
  <div className="mb-5 w-full">
    <input
      type="text"
      placeholder="Username"
      value={userDetails.username}
      onChange={(e) =>
        setUserDetails({ ...userDetails, username: e.target.value })
      }
      className="border border-white text-white placeholder-white p-2 rounded w-full"
    />
    {errors.username && (
      <p className="text-[#d4af37] text-sm">{errors.username}</p>
    )}
  </div>
)}


<div className="mb-5 w-full">
  <input
    type="email"
    placeholder="Email"
    value={userDetails.email}
    onChange={(e) =>
      setUserDetails({ ...userDetails, email: e.target.value })
    }
    className="border border-white text-white placeholder-white p-2 rounded w-full"
  />
  {errors.email && <p className="text-[#d4af37] text-sm">{errors.email}</p>}
</div>

<div className="mb-5 w-full relative">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={userDetails.password}
    onChange={(e) =>
      setUserDetails({ ...userDetails, password: e.target.value })
    }
    className="border border-white text-white placeholder-white p-2 rounded w-full"
  />
  <div
    className="mt-[-32px] absolute right-5 cursor-pointer text-white"
    onClick={handleEye}
  >
    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
  </div>
  {errors.password && (
    <p className="text-[#d4af37] text-sm">{errors.password}</p>
  )}
</div>

            <div className="mb-5 w-full flex justify-between">
              <p className="text-white" style={{ fontSize: "10px" }}>
                Never share your Password with others
              </p>
              {!register && (
                <Link>
                  <p
                    className="text-blue-300 underline"
                    style={{ fontSize: "10px" }}
                  >
                    Forgot password
                  </p>
                </Link>
              )}
            </div>

            <div className="mb-2 w-full">
              <button
                type="button"
                className="bg-[#d4af37] text-[#2F2F2F] font-bold p-3 w-full rounded hover:border hover:border-green-800 hover:bg-white hover:font-bold hover:text-green-800"
                onClick={register ? handleRegister : handleLogin}
              >
                {register ? "Register" : "Login"}
              </button>
            </div>

            <p className="text-white mt-3">
              {register ? "Are you already a user ?" : "Are you a new user ?"}
              <Link to={register ? "/login" : "/register"}>
                <span className="underline ms-2 text-blue-200">
                  {register ? "Login" : "Register"}
                </span>
              </Link>
            </p>
          </form>

          <Link to="/">
            <h1 className="text-end p-5">
              <FontAwesomeIcon icon={faArrowLeft} className="me-3" /> Return to
              home
            </h1>
          </Link>
        </div>
        <div></div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Auth;
