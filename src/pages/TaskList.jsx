import { faEye, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import Popup from "../components/Popup";
import TaskContext from "../context/TaskContext";

const reducer = (state, action) => {
    switch (action.type) {
        case "VIEW": return { type: "view", data: action.payload };
        case "EDIT": return { type: "edit", data: action.payload };
        case "DELETE": return { type: "delete", data: action.payload };
        default: return state;
    }
}

const TaskList = () => {
    const { allTasks } = useContext(TaskContext);
    const [state, dispatch] = useReducer(reducer, { type: null, data: null });
    const [taskData, setTaskData] = useState(null);
    useEffect(() => {
        if (allTasks) {
            setTaskData(allTasks);
        }
    }, [allTasks])

    const handleSearch = (e) => {
        let { value } = e.target;
        const filteredArray = allTasks.filter((task) => (
            task.title.toLowerCase().includes(value.toLowerCase())
        ))
        setTaskData(filteredArray);
    }
    return (
        <div className="container">
            <div className="bg-primary text-white mt-5 p-3">
                <div className="d-flex align-items-center">
                    <h3>Task List</h3>
                    <Link to="/create-task" className="btn btn-info ms-auto">Add Task</Link>
                </div>

                <div className="py-3">
                    <input onChange={handleSearch} type="text" placeholder="Search" className="form-control" />
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
                        taskData ? taskData.map((task) => (
                            <div key={task.id} className="row">
                                <div className="col-lg-1 rounded-2 bg-dark py-2">{task.id}</div>
                                <div className="col-lg-2 rounded-2 bg-dark py-2">{task.title}</div>
                                <div className="col-lg-5 rounded-2 bg-dark py-2">{task.description}</div>
                                <div className="col-lg-2 rounded-2 bg-dark py-2">{task.duedate}</div>
                                <div className="col-lg-2 rounded-2 bg-dark py-2">
                                    <span className="px-2" data-bs-toggle="modal" data-bs-target="#task-popup" onClick={() => { dispatch({ type: "VIEW", payload: task }) }}>
                                        <FontAwesomeIcon icon={faEye} />
                                    </span>
                                    <span className="px-2" data-bs-toggle="modal" data-bs-target="#task-popup" onClick={() => { dispatch({ type: "EDIT", payload: task }) }}>
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </span>
                                    <span className="px-2" data-bs-toggle="modal" data-bs-target="#task-popup" onClick={() => { dispatch({ type: "DELETE", payload: task }) }}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </span>
                                </div>
                            </div>
                        )) : <p>No tasks to display</p>
                    }
                </div>
            </div>
            <Popup task={state} />
        </div>
    )
}

export default TaskList