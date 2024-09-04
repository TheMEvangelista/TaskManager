import React, { useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import PasswordInput from "../../Components/Input/PasswordInput";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if(!name){
      setError("Please enter your name.");
      return;
    }
    setError('');

    //SignUp API Call
  };
  return (
    <>
      <NavBar />
      <section className="flex items-center justify-center mt-28">
        <div className="w-96 border-2 rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7 text-center">SignUp</h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-600 text-xs pb-1">{error}</p>}
            <button type="submit" className="primary-button">
              Create Account
            </button>

            <p className="text-sm text-center mt-4">
              Already haev an account?{" "}
              <Link to="/signup" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
