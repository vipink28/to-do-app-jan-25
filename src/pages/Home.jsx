import { Link, Outlet } from 'react-router-dom';
import illustration from '../assets/illustration.png';
const Home = () => {
    return (
        <div className="container-fluid h-100">
            <div className="row h-100">
                <div className="col-lg-6 bg-primary text-white d-flex flex-column justify-content-center align-items-center h-100">
                    <h1 className="display-5 text-uppercase text-center">
                        An App to<br />
                        make your life<br />
                        <span className="display-2">Organised</span>
                    </h1>
                    <img className='img-fluid' src={illustration} alt="illustration" />
                </div>

                <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center h-100">

                    <div className='card w-50'>
                        <div className='card-header'>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </div>
                        <div className='card-body'>
                            <Outlet />
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Home