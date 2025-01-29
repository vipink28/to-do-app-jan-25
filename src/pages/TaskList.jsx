import { faEye, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link } from "react-router-dom";
import TaskContext from "../context/TaskContext";

const TaskList = () => {
    const { allTasks } = useContext(TaskContext);
    return (
        <div className="container">
            <div className="bg-primary text-white mt-5 p-3">
                <div className="d-flex align-items-center">
                    <h3>Task List</h3>
                    <Link to="/create-task" className="btn btn-info ms-auto">Add Task</Link>
                </div>

                <div className="py-3">
                    <input type="text" placeholder="Search" className="form-control" />
                </div>

                <div className="py-3">
                    <div className="row">
                        <div className="col-lg-1 rounded-2 bg-dark py-2">Sr. No.</div>
                        <div className="col-lg-2 rounded-2 bg-dark py-2">Title</div>
                        <div className="col-lg-5 rounded-2 bg-dark py-2">Description</div>
                        <div className="col-lg-2 rounded-2 bg-dark py-2">Due Date</div>
                        <div className="col-lg-2 rounded-2 bg-dark py-2">Actions</div>
                    </div>
                    {
                        allTasks ? allTasks.map((task) => (
                            <div className="row">
                                <div className="col-lg-1 rounded-2 bg-dark py-2">{task.id}</div>
                                <div className="col-lg-2 rounded-2 bg-dark py-2">{task.title}</div>
                                <div className="col-lg-5 rounded-2 bg-dark py-2">{task.description}</div>
                                <div className="col-lg-2 rounded-2 bg-dark py-2">{task.duedate}</div>
                                <div className="col-lg-2 rounded-2 bg-dark py-2">
                                    <span className="px-2">
                                        <FontAwesomeIcon icon={faEye} />
                                    </span>
                                    <span className="px-2">
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </span>
                                    <span className="px-2">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </span>
                                </div>
                            </div>
                        )) : <p>No tasks to display</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default TaskList