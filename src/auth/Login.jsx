import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const Login = () => {
    const { loginUser } = useContext(AuthContext);
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

    const formSubmit = () => {
        loginUser(formData);
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



