import React from 'react';
import { FaHome, FaEnvelope, FaProjectDiagram } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const NavigationBar = () => {

    // get selected based on the current path
    const [selected, setSelected] = React.useState('/');
    const navigate = useNavigate();

    const handleNavigate = (path) => {
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
