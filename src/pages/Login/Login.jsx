import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Adjust path as needed
import Button from '../../components/ui/Button/Button'; // Adjust path as needed
import './Login.css';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Username validation (can be email or username)
        if (!formData.username) {
            newErrors.username = 'Email or username is required';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            // NOVI Backend Login API call
            const response = await fetch('https://novi.datavortex.nl/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Key': 'parkpal:eCBGnZ1sIu7QwZZja1D3'
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login successful:', data);

                // Use auth context to handle login
                const userData = {
                    id: data.id,
                    username: data.username,
                    email: data.email,
                    roles: data.roles
                };

                login(userData, data.accessToken);

                alert('Login successful!');
                navigate('/'); // Navigate to homepage or dashboard
            } else {
                // Handle API errors
                const errorMessage = data.message || 'Login failed. Please check your credentials.';
                setErrors({ submit: errorMessage });
                console.error('Login failed:', data);
            }

        } catch (error) {
            console.error('Login error:', error);
            setErrors({ submit: 'Network error. Please check your connection and try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>Welcome Back</h1>
                    <p>Sign in to your ParkPal account</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Email or Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={errors.username ? 'error' : ''}
                            placeholder="Enter your email or username"
                            disabled={isLoading}
                        />
                        {errors.username && <span className="error-message">{errors.username}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'error' : ''}
                            placeholder="Enter your password"
                            disabled={isLoading}
                        />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>

                    {errors.submit && (
                        <div className="error-message submit-error">
                            {errors.submit}
                        </div>
                    )}

                    <Button
                        buttonType="submit"
                        variant="primary"
                        disabled={isLoading}
                        className="register"
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </Button>
                </form>

                <div className="login-footer">
                    <p>
                        Don't have an account? {' '}
                        <Link to="/register" className="register-link">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;