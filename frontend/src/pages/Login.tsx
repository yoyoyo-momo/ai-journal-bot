import { useEffect, useState } from "react";

const Login: React.FC = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/auth/user", {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => setUser(data))
            .catch((err) => console.error("Error:", err));
    }, []);

    return (
        <div>
            {user ? (
                <div>
                <h2>Welcome, {user.username}</h2>
                <a href="http://localhost:5000/api/auth/logout">Logout</a>
                </div>
            ) : (
                <button onClick={() => (window.location.href = "http://localhost:5000/api/auth/google")}>
                Login with Google
                </button>
        )}
        </div>
    );
};

export default Login;