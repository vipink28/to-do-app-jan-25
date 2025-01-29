import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskContext from "../context/TaskContext";
import { formatDate } from "../helper";

const CreateTask = () => {
    const { latestTask, recentTasks } = useContext(TaskContext);
    const [isUpdate, setIsUpdate] = useState(false);
    const handleEdit = () => {
        setIsUpdate(true);
    }
    return (
        <div className="container-fluid h-100">
            <div className="row h-100">
                <div className="col-lg-6 bg-primary text-white d-flex flex-column justify-content-center align-items-center h-100">
                    <div className="w-50">
                        <TaskForm isUpdate={isUpdate} data={latestTask} setIsUpdate={setIsUpdate} />
                    </div>
                </div>

                <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center h-100">

                    <div className='card w-75 bg-primary text-white rounded-0 mb-4'>
                        <div className='card-body'>
                            <div className="d-flex justify-content-between align-items-center">
                                <h3>Latest Task</h3>
                                <button onClick={handleEdit} className="btn btn-info">Edit</button>
                            </div>
                            {
                                latestTask &&
                                <div className="py-3">
                                    <h2>{latestTask.title}</h2>
                                    <p>{latestTask.description}</p>
                                    <div className="d-flex align-items-sm-center justify-content-between">
                                        <p>Modified On: {formatDate(latestTask.modifiedon)}</p>
                                        <p>Due Date: {latestTask.duedate}</p>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                    <div className='card w-75 rounded-0 bg-primary text-white'>
                        <div className='card-body'>
                            <h3>Recent Tasks</h3>
                            {
                                recentTasks && recentTasks.map((task) => (
                                    <div className="d-flex align-items-center p-2 border border-warning">
                                        <p className="mb-0">{task.title}</p>
                                        <p className="mb-0 ms-auto">{task.duedate}</p>
                                    </div>
                                ))
                            }
                            <Link to="/task-list" className="d-block mt-2 text-info text-decoration-none">View All</Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CreateTask