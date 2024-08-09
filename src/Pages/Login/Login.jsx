import React from "react";
import { NavBar } from "../../Components/NavBar/NavBar";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <NavBar />
      <main className="flex items-center justify-center mt-40">
        <section className="w-96 border-[2px] rounded-lg bg-background px-7 py-10">
          <form onSubmit={() => {}}>
            <h4 className="text-2xl mb-7 text-white">Sign In</h4>

            <input type="text" placeholder="Email" className="input-box" />

            <button type="submit" className="primary-btn">
              Login
            </button>
            <p className="text-sm text-center text-gray-300 mt-4">
              Not registered yet?{" "}
              <Link to="/signup" className="font-medium text-primary underline">
                Create Accounts
              </Link>
            </p>
          </form>
        </section>
      </main>
    </>
  );
};

export default Login;
