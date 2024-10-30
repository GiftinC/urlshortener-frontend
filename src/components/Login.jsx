import { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        try {
            const response = await api.post('/login', { email, password });
            
            // Check if the login was successful
            if (response.status === 200) {
                console.log('Login successful:', response.data);
                setMessage('Login successful!');
                
                // Redirect to Welcome page on successful login
                navigate('/url-shortener');
            }
        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
            
            // Handle 401 unauthorized error for wrong credentials
            if (error.response?.status === 401) {
                setMessage('Invalid credentials, please try again.');
            } else {
                setMessage('Login failed: ' + (error.response?.data?.message || 'Unknown error'));
            }
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="compdiv">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            {/* Display message */}
            {message && <p>{message}</p>}

            {/* Register and Forgot Password links */}
            <div style={{ marginTop: '20px' }}>
                <button onClick={() => navigate('/register')}>Register</button>
                <button onClick={() => navigate('/forgot-password')}>Forgot Password</button>
            </div>
        </div>
    );
};

export default Login;
