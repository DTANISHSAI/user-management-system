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

      {/* NAVBAR */}

      <nav
        className="navbar navbar-expand-lg navbar-light shadow-sm px-4 py-3 sticky-top"
        style={{
          backgroundColor: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
        }}
      >

        <Link
          to="/"
          className="navbar-brand fw-bold"
          style={{
            color: "#14b8a6",
            fontSize: "1.6rem",
          }}
        >
          USER MANAGEMENT SYSTEM
        </Link>

        <div className="ms-auto">

          <Link
            to="/"
            className="btn btn-outline-dark me-2"
          >
            Home
          </Link>

          {!token ? (

            <>

              <Link
                to="/login"
                className="btn btn-outline-success me-2"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn btn-success"
              >
                Register
              </Link>

            </>

          ) : (

            <>

              <Link
                to="/users"
                className="btn btn-outline-dark me-2"
              >
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

      {/* ROUTES */}

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>

              <Users />

            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;