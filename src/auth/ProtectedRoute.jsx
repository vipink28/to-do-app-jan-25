import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const fetchUserState = async (email) => {
        const response = await fetch(`http://localhost:5001/users?email=${email}`, { method: "GET" });
        if (response.ok) {
            const existingUser = await response.json();
            if (existingUser.length > 0) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
                localStorage.removeItem("todouser");
                navigate("/login");
            }
        } else {
            alert("something went wrong");
        }
    }


    useEffect(() => {
        const localUser = JSON.parse(localStorage.getItem("todouser"));
        if (localUser) {
            fetchUserState(localUser.email);
        } else {
            setIsLoggedIn(false);
            navigate("/login");
        }
    }, []);

    return (
        isLoggedIn ? children : null
    )
}

export default ProtectedRoute