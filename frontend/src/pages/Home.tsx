import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Welcome to AI Journal Bot</h1>
            <p>Your secure and intelligent journal app</p>
            <Link to="/login">
                <button>Login with Google</button>
            </Link>
        </div>
    );
};

export default Home;