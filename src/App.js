import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Dashboard from './components/dashboard/Dashboard';
import UserList from './components/userlist/UserList';
import UserManagement from './components/usermanage/UserManage';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <div className="App">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="*" element={<MainApp />} />
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
};

const MainApp = () => (
    <div className="container">
        <div className="content">
            <Routes>
                <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/user-list" element={<PrivateRoute><UserList /></PrivateRoute>} />
                <Route path="/user-management" element={<PrivateRoute><UserManagement /></PrivateRoute>} />
            </Routes>
        </div>
    </div>
);

export default App;
