// frontend/src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import homelogo from "../assets/homelogo.png"; // Keeping this if you use it for layout/visuals

const Login = () => {
    const [state, setState] = useState("SignUp"); // Default to SignUp for general "Create Account"
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");

        // API endpoint for User Registration or Login
        const apiUrl =
            state === "SignUp"
                ? `${import.meta.env.VITE_BACKEND_URL}/api/user/register`
                : `${import.meta.env.VITE_BACKEND_URL}/api/user/login`;

        try {
            const response = await axios.post(apiUrl, {
                ...(state === "SignUp" && { name: formData.name }), // Include name only for SignUp
                email: formData.email,
                password: formData.password,
            });

            const { token, user } = response.data; // Assuming your backend sends 'user' data with '_id'

            // Save user token in localStorage
            localStorage.setItem("token", token);
            // Clear vendor token just in case
            localStorage.removeItem('vtoken');

            if (user && user._id) {
                localStorage.setItem("userId", user._id); // Store user ID
            }

            alert(`${state === "SignUp" ? "Registration" : "Login"} successful!`);

            // Redirect user after login/signup
            navigate("/user/products"); // Navigate to the user's main section

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
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    {/* Illustration */}
                    <div className="flex justify-center">
                        <img className="w-full max-w-md h-auto object-contain" src={homelogo} alt="Farmly" />
                    </div>

                    {/* Auth Card */}
                    <div className="flex flex-col items-center md:items-start">
                        <p className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
                            {state === "SignUp" ? "Sign Up" : "Login"}
                        </p>

                        <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow px-6 py-6">
                            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                                {state === "SignUp" && (
                                    <div>
                                        <p className="text-lg mb-1">Enter Name</p>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="border border-gray-300 px-3 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                                        className="border border-gray-300 px-3 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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
                                        className="border border-gray-300 px-3 py-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="bg-green-600 text-white py-2 rounded-lg shadow hover:bg-green-700 transition-colors"
                                    disabled={loading}
                                >
                                    {loading
                                        ? `${state === "SignUp" ? "Signing up..." : "Logging in..."}`
                                        : state === "SignUp"
                                            ? "Sign Up"
                                            : "Login"}
                                </button>
                            </form>

                            {errorMsg && <p className="text-red-600 text-sm mt-2">{errorMsg}</p>}

                            <div className="mt-4 text-center">
                                {state === "SignUp" ? (
                                    <p className="text-sm">
                                        Already have an account?{" "}
                                        <span
                                            onClick={() => setState("Login")}
                                            className="text-green-700 hover:text-green-800 underline cursor-pointer"
                                        >
                                            Login here
                                        </span>
                                    </p>
                                ) : (
                                    <p className="text-sm">
                                        Create a new account?{" "}
                                        <span
                                            onClick={() => setState("SignUp")}
                                            className="text-green-700 hover:text-green-800 underline cursor-pointer"
                                        >
                                            Click here
                                        </span>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;