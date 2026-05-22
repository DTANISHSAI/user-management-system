import { useState } from "react";

import axios from "axios";

import {
    useNavigate,
    Link,
} from "react-router-dom";

import { toast } from "react-toastify";

function Login() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(

                "http://localhost:8080/auth/login",

                {
                    email,
                    password,
                }
            );

            // SAVE JWT TOKEN
            localStorage.setItem(
                "token",
                response.data.token
            );

            // FORCE NAVBAR UPDATE
            window.dispatchEvent(
                new Event("storage")
            );

            toast.success(
                "Login successful!"
            );

            navigate("/users");

        } catch (error) {

            toast.error(
                "Invalid email or password"
            );
        }
    };

    return (

        <div
            className="min-vh-100 d-flex justify-content-center align-items-center"
            style={{
                background:
                    "linear-gradient(135deg, #0f172a, #111827, #1e293b)",
                padding: "30px",
            }}
        >

            <div
                className="row shadow-lg overflow-hidden"
                style={{
                    maxWidth: "1000px",
                    width: "100%",
                    borderRadius: "30px",
                    backgroundColor: "white",
                }}
            >

                {/* LEFT PANEL */}

                <div
                    className="col-lg-5 d-none d-lg-flex flex-column justify-content-center align-items-center text-white p-5"
                    style={{
                        background:
                            "linear-gradient(135deg, #14b8a6, #0f766e)",
                    }}
                >

                    <h1
                        className="fw-bold mb-4"
                        style={{
                            fontSize: "3rem",
                        }}
                    >
                        Welcome Back!
                    </h1>

                    <p
                        className="text-center"
                        style={{
                            maxWidth: "300px",
                            lineHeight: "1.8",
                            opacity: "0.9",
                        }}
                    >
                        Login to continue managing
                        users with your modern
                        User Management System.
                    </p>

                    <Link
                        to="/register"
                        className="btn btn-outline-light rounded-pill px-5 py-2 mt-4 fw-semibold"
                    >
                        SIGN UP
                    </Link>

                </div>

                {/* RIGHT PANEL */}

                <div className="col-lg-7 p-5">

                    <div
                        className="d-flex flex-column justify-content-center h-100"
                    >

                        <h1
                            className="fw-bold text-center mb-4"
                            style={{
                                color: "#14b8a6",
                            }}
                        >
                            Login
                        </h1>

                        <p
                            className="text-center text-muted mb-5"
                        >
                            Access your account securely
                        </p>

                        <form onSubmit={handleLogin}>

                            <div className="mb-4">

                                <label className="form-label fw-semibold">

                                    Email Address

                                </label>

                                <input
                                    type="email"
                                    className="form-control form-control-lg"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                    style={{
                                        borderRadius: "12px",
                                        padding: "14px",
                                    }}
                                />

                            </div>

                            <div className="mb-4">

                                <label className="form-label fw-semibold">

                                    Password

                                </label>

                                <input
                                    type="password"
                                    className="form-control form-control-lg"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                    style={{
                                        borderRadius: "12px",
                                        padding: "14px",
                                    }}
                                />

                            </div>

                            <div className="d-grid mb-4">

                                <button
                                    className="btn btn-lg text-white fw-semibold"
                                    style={{
                                        background:
                                            "linear-gradient(135deg, #14b8a6, #0f766e)",
                                        border: "none",
                                        borderRadius: "14px",
                                        padding: "14px",
                                    }}
                                >

                                    LOGIN

                                </button>

                            </div>

                            <div className="text-center">

                                <span className="text-muted">

                                    Don't have an account?

                                </span>

                                <Link
                                    to="/register"
                                    className="ms-2 text-decoration-none fw-semibold"
                                    style={{
                                        color: "#14b8a6",
                                    }}
                                >
                                    Register
                                </Link>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;