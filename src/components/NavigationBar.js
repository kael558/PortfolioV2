import React, { useEffect } from 'react';
import { FaHome, FaEnvelope, FaProjectDiagram, FaList } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const NavigationBar = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const [selected, setSelected] = React.useState('');

	useEffect(() => {
		const path = location.pathname;
		const cleanPath = path.endsWith('/') ? path.slice(0, -1) : path;
		setSelected(cleanPath.replace('/', ''));
	}, [location]);

	const handleNavigate = (path) => {
		sessionStorage.removeItem("homeScrollPosition");
		sessionStorage.removeItem("projectsScrollPosition");
		sessionStorage.removeItem("pastProjectsScrollPosition");

		navigate(path);
	}

	const NavButton = ({ path, icon, text }) => (
		<button
			className={`flex flex-col md:flex-row items-center md:space-x-2 ${selected === path ? 'text-pink-500' : 'text-gray-300'
				} hover:text-pink-500 transition-colors duration-300`}
			onClick={() => handleNavigate(`/${path}`)}
		>
			{icon}
			<span className="text-xs md:text-lg md:font-medium">{text}</span>
		</button>
	);

	return (
		<nav className="bg-gray-800 p-4 fixed left-0 right-0 z-50 border-b border-gray-700 shadow-lg shadow-black/50">
			<div className="mx-auto flex justify-around md:justify-center md:space-x-8">
				<NavButton path="" icon={<FaHome size={20} />} text="Home" />
				<NavButton path="projects" icon={<FaProjectDiagram size={20} />} text="Projects" />
				<NavButton path="past-projects" icon={<FaList size={20} />} text="Past Projects" />
				<NavButton path="contact" icon={<FaEnvelope size={20} />} text="Contact" />
			</div>
		</nav>
	);
};

export default NavigationBar;