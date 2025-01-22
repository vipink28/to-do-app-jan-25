import React, { useState } from 'react';

const TaskForm = () => {
    const [formData, setFormData] = useState(null);

    const handleChange = (e) => {
        let { value, name } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    return (
        <div className='p-2'>
            <h2>Create Task</h2>
            <div className='p-2 bg-white text-dark'>
                <div className='mb-3'>
                    <label className='form-label'>Title</label>
                    <input type='text' name='title' className='form-control' onChange={handleChange} />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Description</label>
                    <textarea name='description' className='form-control' onChange={handleChange} rows="6"></textarea>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Due Date</label>
                    <input type='datetime-local' name='duedate' className='form-control' onChange={handleChange} />
                </div>
                <button className='btn btn-primary'>Add Task</button>

            </div>
        </div>
    )
}

export default TaskForm