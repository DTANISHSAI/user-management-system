function Home() {

    const badgeStyle = {
        background: "#f1f5f9",
        color: "#0f172a",
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
        padding: "10px 16px",
        fontWeight: "500"
    };

    return (

        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #e0f2fe, #f0fdfa, #ecfeff)",
                padding: "40px 20px",
            }}
        >

            <div className="container text-center">

                {/* TITLE */}

                <h1>Welcome to</h1>

                <h1
                    className="fw-bold mb-3"
                    style={{
                        fontSize: "2.8rem",
                        background:
                            "linear-gradient(135deg, #14b8a6, #0f766e)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    User Management System
                </h1>

                {/* BUTTON */}

                <div className="d-flex justify-content-center mb-5">

                    <a
                        href="/users"
                        className="btn btn-lg"
                        style={{
                            background:
                                "linear-gradient(135deg, #14b8a6, #0f766e)",
                            color: "#fff",
                            borderRadius: "12px",
                            padding: "10px 22px",
                            border: "none",
                        }}
                    >
                        Go to Dashboard
                    </a>

                </div>

                {/* ABOUT */}

                <h2 className="fw-bold mb-4">
                    About This Project
                </h2>

                <p
                    style={{
                        maxWidth: "900px",
                        margin: "auto",
                        lineHeight: "1.8",
                        fontSize: "17px",
                        textAlign: "justify",
                        color: "#334155",
                    }}
                >
                    This User Management System is a full-stack web application built using modern technologies & best practices.
                    The frontend is developed using React.js with a component-based architecture & seamless routing.
                    The backend is powered by Spring Boot, following RESTful principles & integrating with a MySQL database using Spring Data JPA.


                    Secure authentication is implemented using JWT (JSON Web Tokens) along with Spring Security,
                    ensuring protected routes and safe user access. The application includes validation, global exception handling,
                    & API documentation support.

                </p>

                {/* TECH STACK */}

                <div className="mt-5">

                    <h4 className="fw-bold mb-4">Tech Stack & Tools</h4>

                    <div className="d-flex flex-wrap justify-content-center gap-3 ">

                        <span style={badgeStyle}>⚛️ React.js</span>
                        <span style={badgeStyle}>🔀 React Router</span>
                        <span style={badgeStyle}>📡 Axios</span>
                        <span style={badgeStyle}>🎨 Bootstrap</span>
                        <span style={badgeStyle}>🌙 Dark Mode UI</span>

                        <span style={badgeStyle}>☕ Spring Boot</span>
                        <span style={badgeStyle}>🔐 Spring Security</span>
                        <span style={badgeStyle}>🪪 JWT Auth</span>
                        <span style={badgeStyle}>🗄️ Spring Data JPA</span>

                        <span style={badgeStyle}>🐬 MySQL</span>

                        <span style={badgeStyle}>📘 Swagger</span>
                        <span style={badgeStyle}>🛠️ REST APIs</span>
                        <span style={badgeStyle}>✔️ Validation</span>
                        <span style={badgeStyle}>⚠️ Exception Handling</span>

                    </div>

                </div>

                {/* DEVELOPMENT TOOLS */}

                <div className="mt-5">

                    <h4 className="fw-bold mb-4">Development Tools</h4>

                    <div className="d-flex flex-wrap justify-content-center gap-3">

                        <span style={badgeStyle}>💻 VS Code (Frontend)</span>
                        <span style={badgeStyle}>☕ Eclipse IDE (Backend)</span>
                        <span style={badgeStyle}>🗄️ MySQL Workbench</span>
                        <span style={badgeStyle}>📬 Postman (API Testing)</span>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Home;