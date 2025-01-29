import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../auth/AuthContext';
import TaskContext from '../context/TaskContext';

const TaskForm = ({ isUpdate, data, setIsUpdate }) => {
    const init = {
        title: "",
        description: "",
        duedate: ""
    }

    const { addTask, updateTask } = useContext(TaskContext);
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState(init);

    useEffect(() => {
        if (isUpdate) {
            setFormData(data)
        }
    }, [isUpdate])


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

    const formUpdate = () => {
        updateTask(formData);
    }

    const formCancel = () => {
        setIsUpdate(false);
        setFormData(init);
    }

    return (
        <div className='p-2'>
            <h2>{isUpdate ? "Update Task" : "Create Task"}</h2>

            <div className='p-2 bg-white text-dark'>
                <div className='mb-3'>
                    <label className='form-label'>Title</label>
                    <input type='text' name='title' className='form-control' value={formData?.title} onChange={handleChange} />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Description</label>
                    <textarea name='description' className='form-control' onChange={handleChange} rows="6" value={formData.description}></textarea>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Due Date</label>
                    <input type='datetime-local' name='duedate' className='form-control' value={formData.duedate} onChange={handleChange} />
                </div>

                {
                    isUpdate ?
                        <>
                            <button onClick={formUpdate} className='btn btn-primary'>Update Task</button>
                            <button onClick={formCancel} className='btn btn-warning ms-2'>Cancel</button>
                        </>
                        :
                        <button onClick={formSubmit} className='btn btn-primary'>Add Task</button>
                }
            </div>
        </div>
    )
}

export default TaskForm