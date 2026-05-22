function UserForm({
    handleSubmit,
    name,
    setName,
    email,
    setEmail,
    editingId,
    darkMode,
    password,
    setPassword,
}) {
    return (
        <div className="p-3 p-md-4">

            {/* HEADER */}

            <div className="text-center mb-4">

                <h1
                    className="fw-bold mb-2"
                    style={{
                        color: darkMode ? "#14b8a6" : "#0f766e",
                    }}
                >
                    User Management System
                </h1>

                <p
                    className={
                        darkMode
                            ? "text-light opacity-75"
                            : "text-muted"
                    }
                >
                </p>

            </div>

            {/* FORM */}

            <form onSubmit={handleSubmit}>

                {/* NAME */}

                <div className="mb-4">

                    <label className="form-label fw-semibold">
                        Full Name
                    </label>

                    <input
                        type="text"
                        className={`form-control form-control-lg ${darkMode ? "dark-input" : ""}`}
                        placeholder="Enter full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                            borderRadius: "12px",
                            padding: "12px",
                        }}
                    />

                </div>

                {/* EMAIL */}

                <div className="mb-4">

                    <label className="form-label fw-semibold">
                        Email Address
                    </label>

                    <input
                        type="email"
                        className={`form-control form-control-lg ${darkMode ? "dark-input" : ""}`}
                        placeholder="Enter email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            borderRadius: "12px",
                            padding: "12px",
                        }}
                    />

                </div>

                {/* PASSWORD */}

                <div className="mb-4">

                    <label className="form-label fw-semibold">
                        Password
                    </label>

                    <input
                        type="password"
                        className={`form-control form-control-lg ${darkMode ? "dark-input" : ""}`}
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            borderRadius: "12px",
                            padding: "12px",
                        }}
                    />

                </div>

                {/* BUTTON */}

                <div className="d-grid">

                    <button
                        style={{
                            background: editingId
                                ? "linear-gradient(135deg, #f59e0b, #d97706)"
                                : "linear-gradient(135deg, #14b8a6, #0f766e)",
                            border: "none",
                            borderRadius: "14px",
                            padding: "14px",
                            fontWeight: "600",
                            color: "white",
                            fontSize: "16px",
                        }}
                    >
                        {editingId ? "Update User" : "Add User"}
                    </button>

                </div>

            </form>

            {/* 🔥 FINAL DARK MODE FIX */}

            <style>
                {`
/* INPUT FIX */
.dark-input {
    background-color: #111827 !important;
    color: #f9fafb !important;
    border: 1px solid #4b5563 !important;
}

/* PLACEHOLDER */
.dark-input::placeholder {
    color: #6b7280 !important;
}

/* LABEL FIX */
.form-label {
    color: ${darkMode ? "#f9fafb" : "#374151"} !important;
}
`}
            </style>

        </div>
    );
}

export default UserForm;