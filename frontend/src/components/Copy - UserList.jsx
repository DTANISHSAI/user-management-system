import { useRef, useEffect } from "react";
function UserList({
    users,
    editUser,
    deleteUser,
    search,
    searchUsers,
    darkMode,
}) {
    const searchInputRef = useRef(null);
    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []); // runs when users change
    return (
        <div
            className={
                darkMode
                    ? "card border-0 shadow-lg mt-4 bg-dark text-light"
                    : "card border-0 shadow-lg mt-4 bg-white text-dark"
            }
            style={{
                borderRadius: "24px",
                overflow: "hidden",
                transition: "all 0.3s ease",
            }}
        >
            <div className="card-body p-4 p-lg-5">

                {/* HEADER */}
                <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">

                    <div>
                        <h2 className="fw-bold mb-1">
                            Users List
                        </h2>

                        <p
                            className={
                                darkMode
                                    ? "text-light opacity-75 mb-0"
                                    : "text-muted mb-0"
                            }
                        >
                            View, search, edit, and manage users
                        </p>
                    </div>

                    {/* SEARCH */}
                    <div
                        style={{
                            width: "100%",
                            maxWidth: "320px",
                        }}
                    >
                        <input
                            //ref={searchInputRef}

                            type="text"
                            className={
                                darkMode
                                    ? "form-control dark-input"
                                    : "form-control"
                            }
                            style={{
                                borderRadius: "12px",
                                padding: "10px",
                                backgroundColor: darkMode ? "#020617" : "#fff",   // darker than card
                                color: darkMode ? "#ffffff" : "#000",
                                border: darkMode ? "1px solid #475569" : "1px solid #ced4da",
                                boxShadow: "none", // removes blue glow
                            }}
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => {
                                const value = e.target.value;
                                searchUsers(value);
                            }}
                        />
                    </div>

                </div>

                {/* TABLE */}
                <div className="table-responsive rounded-4 overflow-hidden">

                    <table
                        className={
                            darkMode
                                ? "table table-dark table-hover align-middle mb-0"
                                : "table table-hover align-middle mb-0"
                        }
                    >

                        <thead
                            className={
                                darkMode
                                    ? "table-dark"
                                    : "table-light"
                            }
                        >
                            <tr>
                                <th className="py-3">Name</th>
                                <th className="py-3">Email</th>
                                <th className="text-center py-3" width="260">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>

                            {users.length > 0 ? (

                                users.map((user) => (

                                    <tr key={user.id}>

                                        <td>{user.name}</td>

                                        <td>
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        
        <span>{user.email}</span>

        <button
            onClick={() => {
                navigator.clipboard.writeText(user.email);
                toast.success("Email copied!");
            }}
            style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
            }}
            title="Copy Email"
        >
            📋
        </button>

    </div>
</td>



                                        {/* ACTIONS */}
                                        <td className="text-center">

                                            {/* EDIT */}
                                            <button
                                                onClick={() => editUser(user)}
                                                style={{
                                                    background: "linear-gradient(135deg, #f59e0b, #d97706)",
                                                    border: "none",
                                                    color: "white",
                                                    borderRadius: "10px",
                                                    padding: "6px 14px",
                                                    fontSize: "14px",
                                                    fontWeight: "600",
                                                    marginRight: "8px",
                                                }}
                                            >
                                                Edit
                                            </button>

                                            {/* DELETE */}
                                            <button
                                                onClick={() => deleteUser(user.id)}
                                                style={{
                                                    background: "linear-gradient(135deg, #ef4444, #b91c1c)",
                                                    border: "none",
                                                    color: "white",
                                                    borderRadius: "10px",
                                                    padding: "6px 14px",
                                                    fontSize: "14px",
                                                    fontWeight: "600",
                                                    marginRight: "8px",
                                                }}
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td colSpan="3" className="text-center py-5">

                                        <h5 className="fw-semibold mb-1">
                                            No users found
                                        </h5>

                                        <p
                                            className={
                                                darkMode
                                                    ? "text-light opacity-75 mb-0"
                                                    : "text-muted mb-0"
                                            }
                                        >
                                            Try searching with another keyword
                                        </p>

                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>
        </div>
    );
}

export default UserList;