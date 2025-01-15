import React, { useState } from 'react';

const Register = () => {

    const [formData, setFormData] = useState(null);
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
        const response = await fetch("http://localhost:5001/users", config);
        console.log(response);
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