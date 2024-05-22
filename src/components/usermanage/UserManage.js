import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './usermanage.css';
import Sidebar from '../sidebar/Sidebar';

const UserManage = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        age: '',
        admin: false,
    });
    //this state is for users in table
    const [users, setUsers] = useState([]);

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
            alert('User created successfully');
        } catch (error) {
            console.error('Failed to create user:', error);
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/users/${id}`);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    return (
        <div className="user-management-container">
            <Sidebar />
            <div className="user-manage-content">
                <div>
                <h2>Add new user</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        required
                    />
                    <input
                        type="text"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        placeholder="Username"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                    <input
                        type="number"
                        name="age"
                        value={user.age}
                        onChange={handleChange}
                        placeholder="Age"
                        required
                    />
                    <label>
                        <input
                            type="checkbox"
                            name="admin"
                            checked={user.admin}
                            onChange={handleChange}
                        />
                        Admin
                    </label>
                    <button type="submit">Create User</button>
                </form>
                </div>
                <div>
                <h2>User List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            <th>Age</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.username}</td>
                                <td>{user.age}</td>
                                <td>
                                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    );
};

export default UserManage;