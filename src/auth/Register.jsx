import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState(null);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const formSubmit = async () => {
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
                localStorage.setItem("todouser", JSON.stringify(user))
                alert("User registered successfully");
                navigate("/task-list");
            } else {
                alert("Something went wrong");
            }
        }
    }

    return (
        <div className='py-2'>
            <div className='mb-3'>
                <label className='form-label'>Name</label>
                <input type='text' name='name' className='form-control' onChange={handleChange} />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Email</label>
                <input type='email' name='email' className='form-control' onChange={handleChange} />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Password</label>
                <input type='password' name='password' className='form-control' onChange={handleChange} />
            </div>
            <button onClick={formSubmit} className='btn btn-primary'>Register</button>
        </div>
    )
}

export default Register