import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="dashboard-content">
                <h2>Welcome to the Dashboard</h2>
                <p>This is the main dashboard content.</p>
            </div>
        </div>
    );
};

export default Dashboard;
