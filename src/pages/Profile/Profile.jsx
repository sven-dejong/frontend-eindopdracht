import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button/Button';
import './Profile.css';

function Profile() {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Redirect if not authenticated
    React.useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to log out?');
        if (confirmLogout) {
            logout();
            navigate('/');
        }
    };

    if (!isAuthenticated || !user) {
        return (
            <div className="profile-container">
                <div className="profile-card">
                    <div className="profile-header">
                        <h1>Access Denied</h1>
                        <p>Please log in to view your profile.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <h1>My Profile</h1>
                    <p>Manage your ParkPal account</p>
                </div>

                <div className="profile-form">
                    <div className="form-group">
                        <label>Username</label>
                        <div className="profile-input-display">
                            {user.username}
                        </div>
                    </div>

                    <div className="profile-actions">
                        <Button
                            variant="primary"
                            onClick={() => navigate('/')}
                            className="back-button"
                        >
                            Back to Home
                        </Button>

                        <Button
                            variant="primary"
                            onClick={handleLogout}
                            className="logout-button"
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;