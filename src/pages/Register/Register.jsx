import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button/Button';
import './Register.css';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [passwordRequirements, setPasswordRequirements] = useState({
        length: false,
        uppercase: false,
        number: false,
        special: false
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { register, loginUser } = useAuth();

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

        // Real-time password validation
        if (name === 'password') {
            validatePasswordRequirements(value);
        }
    };

    const validatePasswordRequirements = (password) => {
        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
        };
        setPasswordRequirements(requirements);
        return Object.values(requirements).every(req => req === true);
    };

    const validateForm = () => {
        const newErrors = {};

        // Username validation
        if (!formData.username) {
            newErrors.username = 'Username is required';
        } else if (formData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters long';
        } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
            newErrors.username = 'Username can only contain letters, numbers, and underscores';
        }

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (!validatePasswordRequirements(formData.password)) {
            newErrors.password = 'Password does not meet all requirements';
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
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
        setErrors({});

        try {
            console.log('🔄 Starting registration process...');

            // Step 1: Register the user
            const registrationResult = await register({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                info: "ParkPal user"
            });

            console.log('✅ Registration successful:', registrationResult);

            // Step 2: Automatically log in the user
            console.log('🔄 Auto-logging in user after registration...');

            await loginUser({
                username: formData.username,
                password: formData.password
            });

            console.log('✅ Auto-login successful');

            // Clear form
            setFormData({
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            });

            // Redirect to homepage (user is now logged in)
            navigate('/');

        } catch (error) {
            console.error('❌ Registration/Login failed:', error);

            let errorMessage = 'Registration failed. Please try again.';

            if (error.message) {
                errorMessage = error.message;
            }

            setErrors({ submit: errorMessage });
        } finally {
            setIsLoading(false);
        }
    };

    const getPasswordRequirementClass = (requirement) => {
        return `password-requirement ${passwordRequirements[requirement] ? 'valid' : 'invalid'}`;
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <div className="register-header">
                    <h1>Create Account</h1>
                    <p>Join ParkPal to save your favorite parks</p>
                </div>

                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={errors.username ? 'error' : ''}
                            placeholder="Choose a username"
                            disabled={isLoading}
                        />
                        {errors.username && <span className="error-message">{errors.username}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'error' : ''}
                            placeholder="Enter your email"
                            disabled={isLoading}
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
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
                            placeholder="Create a password"
                            disabled={isLoading}
                        />
                        {errors.password && <span className="error-message">{errors.password}</span>}

                        {/* Password Requirements Display */}
                        <div className="password-requirements">
                            <div className={getPasswordRequirementClass('length')}>
                                <span className="requirement-icon">
                                    {passwordRequirements.length ? '✓' : '✗'}
                                </span>
                                At least 8 characters
                            </div>
                            <div className={getPasswordRequirementClass('uppercase')}>
                                <span className="requirement-icon">
                                    {passwordRequirements.uppercase ? '✓' : '✗'}
                                </span>
                                One uppercase letter
                            </div>
                            <div className={getPasswordRequirementClass('number')}>
                                <span className="requirement-icon">
                                    {passwordRequirements.number ? '✓' : '✗'}
                                </span>
                                One number
                            </div>
                            <div className={getPasswordRequirementClass('special')}>
                                <span className="requirement-icon">
                                    {passwordRequirements.special ? '✓' : '✗'}
                                </span>
                                One special character
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={errors.confirmPassword ? 'error' : ''}
                            placeholder="Confirm your password"
                            disabled={isLoading}
                        />
                        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
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
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                </form>

                <div className="register-footer">
                    <p>
                        Already have an account? {' '}
                        <Link to="/login" className="login-link">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;