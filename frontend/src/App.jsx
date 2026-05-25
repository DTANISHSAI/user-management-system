import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Register from "./pages/Register";

// PROTECTED ROUTE
function ProtectedRoute({ children }) {

  const token = localStorage.getItem("token");

  return token
    ? children
    : <Navigate to="/login" />;
}

function App() {

  // TOKEN STATE
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  // WATCH TOKEN CHANGES
  useEffect(() => {

    const syncToken = () => {

      setToken(
        localStorage.getItem("token")
      );
    };

    window.addEventListener(
      "storage",
      syncToken
    );

    syncToken();

    return () => {

      window.removeEventListener(
        "storage",
        syncToken
      );
    };

  }, []);

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("token");

    setToken(null);

    window.location.href = "/login";
  };

  return (

  <BrowserRouter>

    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>

      {/* NAVBAR */}

      <nav
        className="navbar navbar-expand-lg navbar-light shadow-sm px-4 py-3 sticky-top"
        style={{
          backgroundColor: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}
        >
          <img
            src="./logo.png"
            alt="UMS Logo"
            style={{ height: "36px" }}
          />

          <span
            style={{
              color: "#14b8a6",
              fontSize: "1.4rem",
              fontWeight: "645"
            }}
          >
            USER MANAGEMENT SYSTEM
          </span>
        </div>

        <div className="ms-auto">

          <Link to="/" className="btn btn-outline-dark me-2">
            Home
          </Link>

          {!token ? (
            <>
              <Link to="/login" className="btn btn-outline-success me-2">
                Login
              </Link>

              <Link to="/register" className="btn btn-success">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/users" className="btn btn-outline-dark me-2">
                Users
              </Link>

              <button
                className="btn btn-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}

        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1 }}>

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />

        </Routes>

      </div>

      {/* FOOTER */}
<footer
  style={{
    borderTop: "1px solid #e5e7eb",
    padding: "12px 20px",
    fontSize: "0.85rem",
    color: "#6b7280",
    backgroundColor: "#f9fafb",
    textAlign: "center"
  }}
>
  <span style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>

    {/* COPYRIGHT */}
    <span>
      © {new Date().getFullYear()} UMS
    </span>

    <span>|</span>

    {/* DEVELOPER */}
    <span style={{ opacity: 1.0 }}>
      Developed by{" "}
      <a
        href="https://dtanishsai.in"
        target="_blank"
        style={{
          textDecoration: "none",
          color: "#14b8a6"
        }}
      >
        Tanishsai Dusanapudi
      </a>
    </span>

    <span>|</span>

    {/* INDIA + FLAG */}
    <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
      <img
        src="./india.png"   // 🔥 put your image in /public
        alt="India"
        style={{
          width: "18px",
          height: "12px",
          objectFit: "cover",
          borderRadius: "2px"
        }}
      />
      INDIA
    </span>

  </span>
</footer>
    </div>

  </BrowserRouter>
);
}

export default App;