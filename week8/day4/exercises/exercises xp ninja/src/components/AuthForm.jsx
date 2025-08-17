import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { simulateLogin, clearError } from '../store/slices/authSlice';

const AuthForm = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.auth);
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));

        if (error) {
            dispatch(clearError());
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (credentials.email && credentials.password) {
            dispatch(simulateLogin(credentials));
        }
    };

    const handleDemoLogin = () => {
        setCredentials({
            email: 'user@example.com',
            password: 'password',
        });
        dispatch(simulateLogin({
            email: 'user@example.com',
            password: 'password',
        }));
    };

    return (
        <div style={{
            maxWidth: '400px',
            margin: '2rem auto',
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#2c3e50' }}>
                Login to Continue
            </h2>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        Email:
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleInputChange}
                        required
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '1rem'
                        }}
                        placeholder="Enter your email"
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        Password:
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleInputChange}
                        required
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '1rem'
                        }}
                        placeholder="Enter your password"
                    />
                </div>

                {error && (
                    <div style={{
                        color: '#e74c3c',
                        backgroundColor: '#fdf2f2',
                        padding: '0.75rem',
                        borderRadius: '4px',
                        marginBottom: '1rem',
                        border: '1px solid #fecaca'
                    }}>
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        backgroundColor: loading ? '#95a5a6' : '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '1rem',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        marginBottom: '1rem'
                    }}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            <div style={{
                textAlign: 'center',
                padding: '1rem 0',
                borderTop: '1px solid #eee',
                marginTop: '1rem'
            }}>
                <p style={{ margin: '0 0 1rem 0', color: '#7f8c8d', fontSize: '0.9rem' }}>
                    Demo credentials:
                </p>
                <button
                    onClick={handleDemoLogin}
                    style={{
                        backgroundColor: '#27ae60',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                    }}
                >
                    Use Demo Login
                </button>
                <p style={{ margin: '0.5rem 0 0 0', color: '#7f8c8d', fontSize: '0.8rem' }}>
                    Email: user@example.com | Password: password
                </p>
            </div>
        </div>
    );
};

export default AuthForm;
