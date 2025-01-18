import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState(null);
    // useNavigate hook is used to add redirection in a function.
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const formSubmit = async () => {
        // get all fields from table
        //const response = await fetch("http://localhost:5001/users", { method: "GET" });
        //const users = await response.json()

        //login code

        const response = await fetch(`http://localhost:5001/users?email=${formData.email}&password=${formData.password}`, { method: "GET" });
        const users = await response.json();
        if (users.length > 0) {
            localStorage.setItem("todouser", JSON.stringify(users[0]));
            alert("user logged in");
            navigate("/task-list");
        } else {
            alert("Email/Password incorrect");
        }
    }
    return (
        <div className='py-2'>
            <div className='mb-3'>
                <label className='form-label'>Email</label>
                <input type='email' name='email' className='form-control' onChange={handleChange} />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Password</label>
                <input type='password' name='password' className='form-control' onChange={handleChange} />
            </div>
            <button onClick={formSubmit} className='btn btn-primary'>Login</button>
        </div>
    )
}

export default Login



