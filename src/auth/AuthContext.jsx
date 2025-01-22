import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    //register
    const registerUser = async (formData) => {
        let config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }

        const checkExisitingUser = await fetch(`http://localhost:5001/users?email=${formData.email}`);
        const user = await checkExisitingUser.json();
        if (user.length > 0) {
            alert("User already exist");
        } else {
            const response = await fetch("http://localhost:5001/users", config);
            if (response.status === 201) {
                const user = await response.json();
                console.log(user);
                localStorage.setItem("todouser", JSON.stringify(user));
                setUser(user);
                alert("User registered successfully");
                navigate("/task-list");
            } else {
                alert("Something went wrong");
            }
        }
    }


    //login
    const loginUser = async (formData) => {
        const response = await fetch(`http://localhost:5001/users?email=${formData.email}&password=${formData.password}`, { method: "GET" });
        const users = await response.json();
        console.log(users);
        if (users.length > 0) {
            localStorage.setItem("todouser", JSON.stringify(users[0]));
            setUser(users[0])
            alert("user logged in");
            navigate("/task-list");
        } else {
            alert("Email/Password incorrect");
        }
    }


    const logout = () => {
        setUser(null);
        localStorage.removeItem("todouser");
        navigate("/login");
    }

    const fetchUserState = async (email) => {
        const response = await fetch(`http://localhost:5001/users?email=${email}`, { method: "GET" });
        if (response.ok) {
            const existingUser = await response.json();
            if (existingUser.length > 0) {
                setUser(existingUser[0]);
            } else {
                localStorage.removeItem("todouser");
            }
        } else {
            alert("something went wrong");
        }
    }




    useEffect(() => {
        const localUser = JSON.parse(localStorage.getItem("todouser"));
        if (localUser) {
            fetchUserState(localUser.email);
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            registerUser,
            loginUser,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;