import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [userId, setUserId] = useState(() => localStorage.getItem("userId"));
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("token") ? true : false);

    const login = (data) => {
        setToken(data.token);
        localStorage.setItem("token", data.token);

        setUserId(data.userId);
        localStorage.setItem("userId", data.userId);

        setIsAuthenticated(true);
    }

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");

        setUserId(null);
        localStorage.removeItem("userId");

        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ token, userId, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;