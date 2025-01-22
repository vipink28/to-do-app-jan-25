import TaskForm from "../components/TaskForm"

const CreateTask = () => {
    return (
        <div className="container-fluid h-100">
            <div className="row h-100">
                <div className="col-lg-6 bg-primary text-white d-flex flex-column justify-content-center align-items-center h-100">
                    <div className="w-50">
                        <TaskForm />
                    </div>
                </div>

                <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center h-100">
                    <div className='card w-50 rounded-0'>
                        <div className='card-body'>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateTask