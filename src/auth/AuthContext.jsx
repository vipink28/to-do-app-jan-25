import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    useEffect(() => {
        const localUser = JSON.parse(localStorage.getItem("todouser"));
        if (localUser) {
            setUser(localUser);
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;