import { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';

interface User {
    name: string;
    email: string;
    [key: string]: any;
}

interface AuthContextType {
    user: User | null;
    role: 'gym' | 'user' | 'super_admin' | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (token: string, role: 'gym' | 'user' | 'super_admin', userData: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [role, setRole] = useState<'gym' | 'user' | 'super_admin' | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    // Initialize state from local storage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedRole = localStorage.getItem('role') as 'gym' | 'user' | 'super_admin' | null;
        const storedUser = localStorage.getItem('user');

        if (storedToken) {
            setToken(storedToken);
            axios.defaults.headers.common['x-auth-token'] = storedToken;
        }
        if (storedRole) setRole(storedRole);
        if (storedUser) setUser(JSON.parse(storedUser));

        setLoading(false);
    }, []);

    const login = (newToken: string, newRole: 'gym' | 'user' | 'super_admin', userData: User) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('role', newRole);
        localStorage.setItem('user', JSON.stringify(userData));

        setToken(newToken);
        setRole(newRole);
        setUser(userData);

        axios.defaults.headers.common['x-auth-token'] = newToken;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');

        setToken(null);
        setRole(null);
        setUser(null);

        delete axios.defaults.headers.common['x-auth-token'];
    };

    return (
        <AuthContext.Provider value={{
            user,
            role,
            token,
            isAuthenticated: !!token,
            loading,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
