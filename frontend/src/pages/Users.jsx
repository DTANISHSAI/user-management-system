import UserForm from "../components/UserForm";
import UserList from "../components/UserList";

import { useEffect, useState } from "react";

import api from "../services/api";

import api from "../api/api";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Users() {

    const [users, setUsers] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(false);

    const [darkMode, setDarkMode] = useState(false);

    const [page, setPage] = useState(0);

    const [totalPages, setTotalPages] = useState(0);

    const [sortBy, setSortBy] = useState("id");

    const [direction, setDirection] = useState("desc");

    const [totalUsers, setTotalUsers] = useState(0);

    const [role, setRole] = useState(
        localStorage.getItem("role") || "user"
    );

    const [currentPassword, setCurrentPassword] = useState("");

    useEffect(() => {

        fetchUsers();

    }, []);

    const fetchUsers = async (pageNumber = 0, keyword = search) => {

    try {

        setLoading(true);

        let url = `/users/paginated?page=${pageNumber}&size=5&sortBy=${sortBy}&direction=${direction}`;

        if (keyword && keyword.trim() !== "") {
            url += `&keyword=${keyword}`;
        }

        const response = await api.get(url);

        setUsers(response.data.content);
        setTotalPages(response.data.totalPages);
        setPage(pageNumber);
        setTotalUsers(response.data.totalElements);

    } catch (error) {

        console.error(error);
        toast.error("Failed to fetch users");

    } finally {

        setLoading(false);
    }
};

    const searchUsers = async (keyword) => {

        setSearch(keyword);

        try {

            if (keyword.trim() === "") {
                fetchUsers();
                return;
            }

            const response = await api.get(
                `/users/search?keyword=${keyword}`
            );

            setUsers(response.data);

        } catch (error) {

            console.error(error);
            toast.error("Search failed");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ VALIDATION

        if (!name.trim()) {
            toast.error("Name is required");
            return;
        }

        if (!email.trim()) {
            toast.error("Email is required");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error("Enter a valid email");
            return;
        }

        if (!editingId && password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        if (editingId && password && !currentPassword) {
            toast.error("Enter current password to change password");
            return;
        }

        try {

            if (editingId) {

                await api.put(`/users/${editingId}`, {
                    name,
                    email,
                    password,
                    currentPassword,
                });

                toast.success("User updated successfully!");
                setEditingId(null);

            } else {

                await api.post("/users", {
                    name,
                    email,
                    password,
                });

                toast.success("User added successfully!");
            }

            setName("");
            setEmail("");
            setPassword("");
            setCurrentPassword(""); // ✅ important
            await fetchUsers();

        } catch (error) {

            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong");
            }
        }
    };

    const deleteUser = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/users/${id}`);

            await fetchUsers();

            toast.success("User deleted successfully!");

        } catch (error) {

            console.error(error);
            toast.error("Failed to delete user");
        }
    };

    const editUser = (user) => {

        setName(user.name);
        setEmail(user.email);
        setPassword("");
        setEditingId(user.id);
    };

    const exportToCSV = async () => {

    try {

        const response = await api.get("/users");

        const allUsers = response.data;

        if (!allUsers || allUsers.length === 0) {
            toast.error("No data to export");
            return;
        }

        const headers = ["Name", "Email"];

        const rows = allUsers.map(user => [
            user.name,
            user.email
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;

        // 🔥 better file name
        link.download = `users_${new Date().toISOString().slice(0,10)}.csv`;

        link.click();

    } catch (error) {

        console.error(error);
        toast.error("Export failed");
    }
};

    return (

        <div
            className="min-vh-100"
            style={{
                background: darkMode
                    ? "linear-gradient(135deg, #0f172a, #111827, #1e293b)"
                    : "linear-gradient(135deg, #e0f2fe, #f0fdfa, #ecfeff)",
                paddingTop: "40px",
                paddingBottom: "40px",
            }}
        >

            <ToastContainer
                position="top-right"
                autoClose={3000}
                theme={darkMode ? "dark" : "light"}
            />

            <div className="container" style={{ maxWidth: "1100px" }}>

                {/* HEADER */}

                <div className="d-flex justify-content-between align-items-center mb-5">

    <div>

        <h1
            className="fw-bold"
            style={{ color: "#14b8a6" }}
        >
            User Dashboard
        </h1>

        <p className={darkMode ? "text-light opacity-75 mb-0" : "text-muted mb-0"}>
            Manage users efficiently
        </p>

    </div>

    {/* 🔥 RIGHT SIDE CONTROLS */}
    <div className="d-flex align-items-center gap-3">

        {/* ROLE BADGE */}
        <span
            style={{
                background: role === "admin"
                    ? "linear-gradient(135deg, #ef4444, #b91c1c)"
                    : "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                color: "#fff",
                padding: "6px 12px",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: "600",
            }}
        >
            {role === "admin" ? "ADMIN" : "USER"}
        </span>

        {/* EXPORT BUTTON */}
        <button
            onClick={exportToCSV}
            style={{
                background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                padding: "10px 18px",
                fontWeight: "600",
            }}
        >
            Export CSV
        </button>

        {/* DARK MODE BUTTON */}
        <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
                background: darkMode
                    ? "linear-gradient(135deg, #facc15, #f59e0b)"
                    : "linear-gradient(135deg, #14b8a6, #0f766e)",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                padding: "10px 18px",
                fontWeight: "600",
            }}
        >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

    </div>

</div>

                {/* 🔥 DASHBOARD STATS (NEW) */}

                <div className="row mb-4">

                    <div className="col-md-4">
                        <div
    className="p-3 shadow"
    style={{
        borderRadius: "20px",
        background: darkMode
            ? "rgba(31, 41, 55, 0.85)"
            : "#ffffff",
        color: darkMode ? "#fff" : "#000",
    }}
>
                            <h6
                                className="mb-1"
                                style={{
                                    color: darkMode ? "#cbd5f5" : "#6b7280",
                                    fontWeight: "500",
                                }}
                            >
                                Total Users
                            </h6>
                            <h3 className="fw-bold">
                                {totalUsers}
                            </h3>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div
    className="p-3 shadow"
    style={{
        borderRadius: "20px",
        background: darkMode
            ? "rgba(31, 41, 55, 0.85)"
            : "#ffffff",
        color: darkMode ? "#fff" : "#000",
    }}
>
                            <h6
                                className="mb-1"
                                style={{
                                    color: darkMode ? "#cbd5f5" : "#6b7280",
                                    fontWeight: "500",
                                }}
                            >
                                Current Page
                            </h6>
                            <h3 className="fw-bold">
                                {page + 1}
                            </h3>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div
    className="p-3 shadow"
    style={{
        borderRadius: "20px",
        background: darkMode
            ? "rgba(31, 41, 55, 0.85)"
            : "#ffffff",
        color: darkMode ? "#fff" : "#000",
    }}
>
                            <h6
                                className="mb-1"
                                style={{
                                    color: darkMode ? "#cbd5f5" : "#6b7280",
                                    fontWeight: "500",
                                }}
                            >
                                Users Per Page
                            </h6>
                            <h3 className="fw-bold">
                                5
                            </h3>
                        </div>
                    </div>

                </div>

                {/* FORM CARD */}

                <div
                    className="shadow-lg border-0 mb-4"
                    style={{
                        borderRadius: "20px",
                        background: darkMode
                            ? "rgba(31, 41, 55, 0.85)"
                            : "rgba(255, 255, 255, 0.9)",
                        backdropFilter: "blur(12px)",
                    }}
                >

                    <div className="card-body">

                        <UserForm
                            handleSubmit={handleSubmit}
                            name={name}
                            setName={setName}
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            currentPassword={currentPassword}
                            setCurrentPassword={setCurrentPassword}
                            editingId={editingId}
                            darkMode={darkMode}
                        />

                    </div>

                </div>

                {/* LOADING */}

                {
                    loading ? (

                        <div className="text-center mt-5">

                            <div className="spinner-border text-primary"></div>

                            <p className="mt-3">
                                Loading users...
                            </p>

                        </div>

                    ) : (

                        <div
                            className="shadow-lg border-0"
                            style={{
                                borderRadius: "20px",
                                background: darkMode
                                    ? "rgba(31, 41, 55, 0.85)"
                                    : "rgba(255, 255, 255, 0.9)",
                                backdropFilter: "blur(12px)",
                            }}
                        >

                            <div className="card-body pb-4">

                                {/* <div className="d-flex justify-content-center mt-4 mb-3 gap-3">

                                    <select
                                        className={
                                            darkMode
                                                ? "form-select bg-dark text-light border-secondary"
                                                : "form-select"
                                        }
                                        style={{
                                            maxWidth: "200px",
                                            borderRadius: "10px",
                                        }}
                                        value={sortBy}
                                        onChange={(e) => {
                                            setSortBy(e.target.value);
                                            fetchUsers(0);
                                        }}
                                    >
                                        <option value="id">Sort by Latest</option>
                                        <option value="name">Sort by Name</option>
                                        <option value="email">Sort by Email</option>
                                    </select>

                                    <button
                                        className={
                                            darkMode
                                                ? "btn btn-outline-light"
                                                : "btn btn-outline-secondary"
                                        }
                                        style={{ borderRadius: "10px", padding: "6px 14px" }}
                                        onClick={() => {
                                            const newDirection = direction === "asc" ? "desc" : "asc";
                                            setDirection(newDirection);
                                            fetchUsers(0);
                                        }}
                                    >
                                        {direction === "asc" ? "⬆️" : "⬇️"}
                                    </button>

                                </div> */}

                                <UserList
                                    users={users}
                                    editUser={editUser}
                                    deleteUser={deleteUser}
                                    search={search}
                                    searchUsers={searchUsers}
                                    darkMode={darkMode}
                                    role={role}
                                />

                                <div className="d-flex justify-content-center mt-4 gap-3">

                                    {/* PREVIOUS BUTTON */}

                                    <button
                                        className="btn btn-outline-secondary"
                                        disabled={page === 0}
                                        onClick={() => fetchUsers(page - 1)}
                                    >
                                        Previous
                                    </button>

                                    {/* PAGE INFO */}

                                    <span className="align-self-center fw-semibold">
                                        Page {page + 1} of {totalPages}
                                    </span>

                                    {/* NEXT BUTTON */}

                                    <button
                                        className="btn btn-outline-secondary"
                                        disabled={page === totalPages - 1}
                                        onClick={() => fetchUsers(page + 1)}
                                    >
                                        Next
                                    </button>

                                </div>

                            </div>

                        </div>

                    )
                }

            </div>

        </div>
    );
}

export default Users;