import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './register.css';

const Register = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        age: '',
        admin: false,
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUser({
            ...user,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/users/register', user);
            alert('User registered successfully');
            navigate('/login');
        } catch (error) {
            alert('Failed to register, make sure service is running and try different username!');
            console.error('Failed to register user:', error);
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="firstName" value={user.firstName} onChange={handleChange} placeholder="First Name" required />
                    <input type="text" name="lastName" value={user.lastName} onChange={handleChange} placeholder="Last Name" required />
                    <input type="text" name="username" value={user.username} onChange={handleChange} placeholder="Username" required />
                    <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" required />
                    <input type="number" name="age" value={user.age} onChange={handleChange} placeholder="Age" required />
                    <label>
                        <input type="checkbox" name="admin" checked={user.admin} onChange={handleChange} />
                        Admin
                    </label>
                    <button type="submit">Register</button>
                </form>
                <p>Already have an account? <Link to="/login">Log in!</Link></p>
            </div>
        </div>
    );
};

export default Register;
