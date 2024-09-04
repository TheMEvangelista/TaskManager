import React, { useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../Components/Input/PasswordInput";
import { validateEmail } from "../../Utils/helper";
import axiosInstance from "../../Utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email adress.");
      return;
    }
    if (!password) {
      setError("Please enter a valid password.");
      return;
    }

    setError("");

    //Login API Call
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      //Handle sucessful login response
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/");
      }
    } catch (error) {
      //Handle login error
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error ocurred. Please try again.");
      }
    }
  };

  return (
    <>
      <NavBar />
      <section className="flex items-center justify-center mt-28">
        <div className="w-96 border-2 rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7 text-center">Login</h4>
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {error && <p className="text-red-600 text-xs pb-1">{error}</p>}
            <button type="submit" className="primary-button">
              Login
            </button>

            <p className="text-sm text-center mt-4">
              Not Registered yet?{" "}
              <Link to="/signup" className="font-medium text-primary underline">
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
