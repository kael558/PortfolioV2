import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin, FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const projects = [
  {
    title: "Project A",
    description: "A SaaS solution for project management",
    image: "/path/to/projectA.jpg",
    percentComplete: 75,
    isCompleted: false,
    link: "#"
  },
  {
    title: "AI Assistant",
    description: "An AI-powered virtual assistant for businesses",
    image: "/path/to/ai-assistant.jpg",
    percentComplete: 40,
    isCompleted: false,
    link: "#"
  },
  {
    title: "Past Project X",
    description: "A successful SaaS product for data analysis",
    image: "/path/to/projectX.jpg",
    isCompleted: true,
    link: "#"
  },
  {
    title: "Past Project Y",
    description: "An AI-driven recommendation engine",
    image: "/path/to/projectY.jpg",
    isCompleted: true,
    link: "#"
  }
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8">
          Rahel Gunaratne
        </h1>
        
        <div className="flex justify-center space-x-6 mb-12">
          {[FaGithub, FaTwitter, FaLinkedin].map((Icon, index) => (
            <a 
              key={index}
              href="#" 
              className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
            >
              <Icon size={28} />
            </a>
          ))}
        </div>
        
        <p className="text-2xl text-center text-gray-300 mb-16 font-light">
          I create and sell <span className="text-purple-400 font-normal">SaaS</span> and <span className="text-pink-400 font-normal">AI products</span>
        </p>
        
        <h2 className="text-3xl font-bold mb-8 text-gray-100">Current Projects</h2>
        {projects.filter(p => !p.isCompleted).map((project, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-6 mb-8 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
            <div className="flex flex-col md:flex-row items-center">
              <img src={project.image} alt={project.title} className="w-full md:w-1/3 h-48 object-cover rounded-lg mb-4 md:mb-0 md:mr-6" />
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-2 text-purple-300">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${project.percentComplete}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{project.percentComplete}% Complete</span>
                  <Link to="/project" className="text-pink-400 hover:text-pink-300 transition-colors duration-300">

                    View Project <FaExternalLinkAlt className="inline ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <h2 className="text-3xl font-bold mt-16 mb-8 text-gray-100">Past Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.filter(p => p.isCompleted).map((project, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-purple-300">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <a href={project.link} className="text-pink-400 hover:text-pink-300 transition-colors duration-300">
                  View Project <FaExternalLinkAlt className="inline ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;