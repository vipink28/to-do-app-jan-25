import React, { useContext, useRef } from 'react';
import TaskContext from '../context/TaskContext';
import { formatDate } from '../helper';
import TaskForm from './TaskForm';

const Popup = ({ task }) => {
    let { type, data } = task;
    const { deleteTask } = useContext(TaskContext);
    const closeBtn = useRef(null);
    return (
        <div className="modal" tabIndex="-1" id='task-popup'>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button ref={closeBtn} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {
                            type === "view" ?
                                <div>
                                    <h3>{data?.title}</h3>
                                    <p>{data?.description}</p>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <p className='mb-0'>Modified On: {formatDate(data?.modifiedon)}</p>
                                        <p className='mb-0'>Due Date: {formatDate(data?.duedate)}</p>
                                    </div>
                                </div>
                                : type === "edit" ?
                                    <div>
                                        <TaskForm isUpdate={true} data={data} closeBtn={closeBtn} isPopup={true} />
                                    </div>
                                    :
                                    <div className="py-2">
                                        <p>Are you sure? You want to delete this task.</p>
                                        <div className='d-flex justify-content-end'>
                                            <button onClick={() => { deleteTask(data.id) }} className='btn btn-danger'>Yes</button>
                                            <button className='btn btn-warning ms-2' data-bs-dismiss="modal">NO</button>
                                        </div>
                                    </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Popup