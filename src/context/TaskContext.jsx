import { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "../auth/AuthContext";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [allTasks, setAllTasks] = useState(null);
    const [recentTasks, setRecentTasks] = useState(null);
    const [latestTask, setLatestTask] = useState(null);

    //add task
    const addTask = async (formData) => {
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        }

        try {
            const response = await fetch(`http://localhost:5001/tasks`, config);
            if (response.status === 201) {
                alert("Task added successfuly");
                getAllTasks(user.id);
            }
        } catch (error) {
            console.log(error);
        }
    }

    //update task
    const updateTask = async (formData) => {
        const config = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        }

        try {
            const response = await fetch(`http://localhost:5001/tasks/${formData.id}`, config);
            if (response.status === 200) {
                alert("Task updated successfuly");
                getAllTasks(user.id);
            }
        } catch (error) {
            console.log(error);
        }
    }



    //get tasks
    const getAllTasks = async (userid) => {
        try {
            const response = await fetch(`http://localhost:5001/tasks?userid=${userid}`, { method: "GET" });
            if (response.ok) {
                const tasks = await response.json();
                setAllTasks(tasks);
                setRecentTasks(tasks.slice(-3));
                setLatestTask(tasks[tasks.length - 1]);
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        if (user) {
            getAllTasks(user.id);
        }
    }, [user])

    return (
        <TaskContext.Provider value={{
            addTask,
            recentTasks,
            allTasks,
            latestTask,
            updateTask
        }}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskContext;