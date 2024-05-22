import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ isAuthenticated: false, role: '', username: '' });

    const login = (role, username) => {
        setAuth({ isAuthenticated: true, role, username });
    };

    const logout = () => {
        setAuth({ isAuthenticated: false, role: '' });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
