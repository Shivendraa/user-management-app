import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';
import AuthContext from '../../context/AuthContext';

const Sidebar = () => {
    const { auth } = useContext(AuthContext);
    const { logout } = useContext(AuthContext);
    const handleLogout = () => {
        logout();
    };
    return (
        <div className="sidebar">
            <h4>Hello there, {auth.username}!</h4>
            <h3>Menu</h3>
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/user-list">User List</Link></li>
                {auth.role === 'ADMIN' && <li><Link to="/user-management">User Management</Link></li>}
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </ul>
        </div>
    );
};

export default Sidebar;
