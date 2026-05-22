import { useState } from "react";

import api from "../services/api";

import api from "../api/api";


import {
    Link,
    useNavigate,
} from "react-router-dom";

import { toast } from "react-toastify";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            await api.post("/users",
                {
                    name,
                    email,
                    password,
                }
            );

            toast.success(
                "Registration successful!"
            );

            navigate("/login");

        } catch (error) {

            if (error.response?.data) {

                toast.error(
                    error.response.data
                );

            } else {

                toast.error(
                    "Registration failed"
                );
            }
        }
    };

    return (

        <div
            className="min-vh-100 d-flex justify-content-center align-items-center"
            style={{
                background: `
radial-gradient(circle at top left, rgba(113, 14, 226, 0.2), transparent 90%),
radial-gradient(circle at bottom right, rgba(29, 230, 230, 0.15), transparent 90%)
`,
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
                        Join UMS!
                    </h1>

                    <p
                        className="text-center"
                        style={{
                            maxWidth: "300px",
                            lineHeight: "1.8",
                            opacity: "0.9",
                        }}
                    >
                        Create your account and
                        start managing users with
                        a modern secure system.
                    </p>

                    <Link
                        to="/login"
                        className="btn btn-outline-light rounded-pill px-5 py-2 mt-4 fw-semibold"
                    >
                        SIGN IN
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
                            Create Account
                        </h1>

                        <p
                            className="text-center text-muted mb-5"
                        >
                            Register to access your dashboard
                        </p>

                        <form onSubmit={handleRegister}>

                            <div className="mb-4">

                                <label className="form-label fw-semibold">

                                    Full Name

                                </label>

                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Enter full name"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
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

                                    CREATE ACCOUNT

                                </button>

                            </div>

                            <div className="text-center">

                                <span className="text-muted">

                                    Already have an account?

                                </span>

                                <Link
                                    to="/login"
                                    className="ms-2 text-decoration-none fw-semibold"
                                    style={{
                                        color: "#14b8a6",
                                    }}
                                >
                                    Login
                                </Link>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;