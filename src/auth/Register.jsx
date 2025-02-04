import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const Register = () => {
    const { registerUser } = useContext(AuthContext);
    const [formData, setFormData] = useState(null);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            role: "user"
        }))
    }

    const formSubmit = () => {
        registerUser(formData);
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