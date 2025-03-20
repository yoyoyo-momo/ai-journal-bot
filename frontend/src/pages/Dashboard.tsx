import { useEffect, useState } from 'react';

const Dashboard: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/auth/user', {
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched user data:", data);
                if (data && data.username) {
                    setUser(data);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching user:", err)
                setLoading(false);
            });
    }, []);


    if (loading) return <p>Loading user data...</p>;
    
    return (
        <div>
            <h1>Dashboard</h1>
            {user ? (
                <div>
                    <p>Welcome, {user.username}</p>
                    <img src={user.avatar} alt="User avatar" />
                    <a href="http://localhost:5000/api/auth/logout">Logout</a>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default Dashboard;