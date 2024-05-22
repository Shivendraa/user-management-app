// Login.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';

jest.mock('axios');

describe('Login Component', () => {
    test('renders login form', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    test('handles login success', async () => {
        axios.post.mockResolvedValue({ data: { token: 'fake-token' } });

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
        fireEvent.click(screen.getByText('Login'));

        expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/api/users/login', {
            username: 'testuser',
            password: 'password'
        });

        // Simulate waiting for the async function
        await screen.findByText('Dashboard');
    });

    test('handles login failure', async () => {
        axios.post.mockRejectedValue(new Error('Login failed'));

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'wronguser' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });
        fireEvent.click(screen.getByText('Login'));

        // Simulate waiting for the async function
        await screen.findByText('Login failed');
    });
});
