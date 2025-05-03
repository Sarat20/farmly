import React, { useState } from "react";
import homelogo from "../assets/homelogo.png";
const Login = () => {
  const [state, setState] = useState("SignUp");

  return (

 <div  className="flex flex-row space-x-10"> 

    <img className="w-1/3 h-full mt-5 ml-5" src={homelogo} alt="" />

    <div className="flex flex-col items-center mt-8">
      <p className="text-3xl font-bold mb-6">
        {state === "SignUp" ? "SIGN UP" : "LOGIN"}
      </p>

      <div className="border-2 border-black px-8 py-6 rounded-lg w-96">
        <form className="flex flex-col space-y-4">
          {state === "SignUp" && (
            <div>
              <p className="text-lg mb-1">Enter Name</p>
              <input
                type="text"
                className="border border-black px-3 py-1 w-full"
                placeholder="Enter your name"
              />
            </div>
          )}

          <div>
            <p className="text-lg mb-1">Email</p>
            <input
              type="email"
              className="border border-black px-3 py-1 w-full"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <p className="text-lg mb-1">Password</p>
            <input
              type="password"
              className="border border-black px-3 py-1 w-full"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
          >
            {state === "SignUp" ? "SIGN UP" : "LOGIN"}
          </button>
        </form>

        <div className="mt-4 text-center">
          {state === "SignUp" ? (
            <p className="text-sm">
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-blue-600 underline cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm">
              Create a new account?{" "}
              <span
                onClick={() => setState("SignUp")}
                className="text-blue-600 underline cursor-pointer"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </div>
    </div>


</div>
  );
};

export default Login;
