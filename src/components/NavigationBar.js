import React from 'react';
import { FaHome, FaEnvelope, FaProjectDiagram, FaList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const NavigationBar = () => {

    // get initial path from the current location
    const currentPath = window.location.pathname;
    const initialPath = currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath;

    const [selected, setSelected] = React.useState(initialPath);
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        sessionStorage.removeItem("homeScrollPosition");
        sessionStorage.removeItem("projectsScrollPosition");
        sessionStorage.removeItem("pastProjectsScrollPosition");

        setSelected(path);
        navigate(path);
    }

    return (
        <nav className="bg-gray-800 p-4 mb-12">
            <div className="mx-auto flex justify-center space-x-8">
                <button
                    to="/"
                    className={`flex items-center space-x-2 text-lg font-medium ${
                        selected === '/' ? 'text-pink-500' : 'text-gray-300'
                    } hover:text-pink-500 transition-colors duration-300`}
                    onClick={() => handleNavigate('/')}
                >
                    <FaHome />
                    <span>Home</span>
                </button>
                <button
                    to="/projects"
                    className={`flex items-center space-x-2 text-lg font-medium ${
                        selected === '/projects' ? 'text-pink-500' : 'text-gray-300'
                    } hover:text-pink-500 transition-colors duration-300`}
                    onClick={() => handleNavigate('/projects')}
                >
                    <FaProjectDiagram />
                    <span>Projects</span>
                </button>
                <button
                    to="/past-projects"
                    className={`flex items-center space-x-2 text-lg font-medium ${
                        selected === '/past-projects' ? 'text-pink-500' : 'text-gray-300'
                    } hover:text-pink-500 transition-colors duration-300`}
                    onClick={() => handleNavigate('/past-projects')}
                >
                    <FaList />
                    <span>Past Projects</span>
                </button>


                <button
                    to="/contact"
                    className={`flex items-center space-x-2 text-lg font-medium ${
                        selected === '/contact' ? 'text-pink-500' : 'text-gray-300'
                    } hover:text-pink-500 transition-colors duration-300`}
                    onClick={() => handleNavigate('/contact')}
                >
                    <FaEnvelope />
                    <span>Contact</span>
                </button>
            </div>
        </nav>
    );
};

export default NavigationBar;
