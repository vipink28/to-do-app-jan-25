import React, { useContext, useState } from 'react';
import AuthContext from '../auth/AuthContext';
import TaskContext from '../context/TaskContext';

const TaskForm = () => {
    const { addTask } = useContext(TaskContext);
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState(null);

    const handleChange = (e) => {
        let { value, name } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            userid: user.id,
            modifiedon: Date()
        }))
    }

    const formSubmit = () => {
        addTask(formData);
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
                <button onClick={formSubmit} className='btn btn-primary'>Add Task</button>
            </div>
        </div>
    )
}

export default TaskForm