import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import homelogo from "../assets/homelogo.png";

const Login = () => {
  const [state, setState] = useState("SignUp");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submit for registration or login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const apiUrl =
      state === "SignUp"
        ? "http://localhost:4000/api/user/register"
        : "http://localhost:4000/api/user/login";

    try {
      const response = await axios.post(apiUrl, {
        ...(state === "SignUp" && { name: formData.name }), // Include name only in SignUp
        email: formData.email,
        password: formData.password,
      });

      const { token } = response.data;

      // Save token in localStorage or sessionStorage
      localStorage.setItem("token", token);

      alert(`${state === "SignUp" ? "Registration" : "Login"} successful!`);

      // Redirect user after login/signup
      navigate("/user/products"); // You can change this to /vendor/dashboard if it's vendor

      // Reset form
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row space-x-10">
      <img className="w-1/3 h-full " src={homelogo} alt="" />

      <div className="flex flex-col items-center mt-8">
        <p className="text-3xl font-bold mb-6">
          {state === "SignUp" ? "SIGN UP" : "LOGIN"}
        </p>

        <div className="border-2 border-black px-8 py-6 rounded-lg w-96">
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            {state === "SignUp" && (
              <div>
                <p className="text-lg mb-1">Enter Name</p>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border border-black px-3 py-1 w-full"
                  placeholder="Enter your name"
                  required
                />
              </div>
            )}

            <div>
              <p className="text-lg mb-1">Email</p>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="border border-black px-3 py-1 w-full"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <p className="text-lg mb-1">Password</p>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="border border-black px-3 py-1 w-full"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
              disabled={loading}
            >
              {loading
                ? `${state === "SignUp" ? "Signing up..." : "Logging in..."}` 
                : state === "SignUp" 
                ? "SIGN UP" 
                : "LOGIN"}
            </button>
          </form>

          {errorMsg && <p className="text-red-600 text-sm mt-2">{errorMsg}</p>}

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
