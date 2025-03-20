import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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

    if (!user) {
        navigate('/');
        return null;
    }
    
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {user.username}</p>
            <img src={user.avatar} alt="User avatar" />

            <br />
            <Link to="/journal">
                <button>Go to Journal</button>
            </Link>

            <a href="http://localhost:5000/api/auth/logout">Logout</a>
        </div>
    );
};

export default Dashboard;