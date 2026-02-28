import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => { //to make authentication globally accessible
    const [user, setUser] = useState(null);
    // load the user from localStorage
    useEffect(() => {
        const currUser = localStorage.getItem("user");
        if(currUser)
            setUser(JSON.parse(currUser));
    }, []);

    const login = (userData)=>{
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    };

    const logout = ()=>{
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
