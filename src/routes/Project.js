import React from 'react';
import { FaGithub, FaExternalLinkAlt, FaUserCircle, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ContentRenderer = ({ content }) => {
  switch (content.type) {
    case 'text':
      return <p className="text-gray-300 leading-relaxed mb-4">{content.data}</p>;
    case 'image':
      return <img src={content.src} alt={content.alt || ''} className="w-full rounded-lg mb-4" />;
    case 'video':
      return (
        <video controls className="w-full rounded-lg mb-4">
          <source src={content.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    default:
      return null;
  }
};

const Project = ({ project }) => {
  // Simulated project data
  const projectData = {
    title: "AI-Powered Content Generator",
    background: [
      { type: 'text', data: "In the era of content marketing, businesses struggle to produce high-quality, engaging content at scale." },
      { type: 'image', src: "/path/to/background-image.jpg", alt: "Content marketing challenge" },
      { type: 'text', data: "This project aims to leverage AI to streamline content creation while maintaining brand voice and quality." }
    ],
    teamMembers: [
      { name: "Rahel Gunaratne", role: "Project Lead" },
      { name: "Alex Johnson", role: "AI Engineer" },
      { name: "Samantha Lee", role: "UX Designer" },
    ],
    problem: [
      { type: 'text', data: "Content creators face burnout and struggle to maintain consistency across various platforms, leading to decreased engagement and brand dilution." }
    ],
    solution: [
      { type: 'text', data: "Our AI-powered content generator uses advanced natural language processing to create platform-specific content that aligns with brand guidelines and resonates with target audiences." },
      { type: 'image', src: "/path/to/solution-diagram.jpg", alt: "AI Content Generator Diagram" }
    ],
    timeline: [
      { date: "2023-01", event: "Project Kickoff", link: "#" },
      { date: "2023-03", event: "AI Model Training", link: "#" },
      { date: "2023-06", event: "Beta Testing", link: "#" },
      { date: "2024-08", event: "Public Launch", link: "#" },
    ],
    videoDemo: "https://example.com/demo-video.mp4",
    githubLink: "https://github.com/example/ai-content-generator",
    liveLink: "https://ai-content-generator.example.com",
  };

  const currentDate = new Date().toISOString().slice(0, 7);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
      <Link to="/" className="flex items-center text-pink-400 hover:text-pink-300 mb-8">
        <FaArrowLeft className="mr-2" /> Back to Home
      </Link>

        <h1 className="text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          {projectData.title}
        </h1>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-purple-300">Background</h2>
          {projectData.background.map((content, index) => (
            <ContentRenderer key={index} content={content} />
          ))}
        </section>

        {projectData.teamMembers && projectData.teamMembers.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-4 text-purple-300">Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projectData.teamMembers.map((member, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg text-center">
                  <FaUserCircle className="text-5xl text-gray-400 mb-2 mx-auto" />
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-gray-400">{member.role}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-purple-300">Problem & Solution</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2 text-pink-400">The Problem</h3>
            {projectData.problem.map((content, index) => (
              <ContentRenderer key={index} content={content} />
            ))}
            <h3 className="text-xl font-semibold mb-2 text-pink-400">Our Solution</h3>
            {projectData.solution.map((content, index) => (
              <ContentRenderer key={index} content={content} />
            ))}
          </div>
        </section>

        {projectData.timeline && projectData.timeline.length > 0 && (
  <section className="mb-12">
    <h2 className="text-3xl font-semibold mb-4 text-purple-300">Timeline</h2>
    <div className="relative">
      <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-purple-500 transform -translate-x-1/2"></div>
      {projectData.timeline.map((item, index) => {
        const isCurrent = item.date === currentDate;

        return (
          <div key={index} className={`mb-8 flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
            <div className="w-1/2"></div>
            <div className={`bg-purple-500 rounded-full h-8 w-8 flex items-center justify-center z-10 absolute left-1/2 transform -translate-x-1/2 ${isCurrent ? 'bg-pink-500' : ''}`}>
              <span className="text-xs font-semibold">{index + 1}</span>
            </div>
            <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
              <div className={`bg-gray-800 p-4 rounded-lg shadow-lg ${isCurrent ? 'border-2 border-pink-500' : ''}`}>
                <h3 className="text-lg font-semibold">{item.event} {isCurrent && <span className="text-pink-400">(Now)</span>}</h3>
                <p className="text-gray-400">{item.date}</p>
                <a href={item.link} className="text-pink-400 hover:text-pink-300 transition-colors duration-300">
                  Learn more <FaExternalLinkAlt className="inline ml-1" />
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </section>
)}

        {projectData.videoDemo && (
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-4 text-purple-300">Video Demo</h2>
            <div className="aspect-w-16 aspect-h-9">
              <iframe 
                src={projectData.videoDemo} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full rounded-lg"
              ></iframe>
            </div>
          </section>
        )}

        <div className="flex justify-center space-x-6">
          {projectData.githubLink && (
            <a href={projectData.githubLink} className="bg-gray-800 text-white px-6 py-3 rounded-full flex items-center hover:bg-gray-700 transition-colors duration-300">
              <FaGithub className="mr-2" /> View on GitHub
            </a>
          )}
          {projectData.liveLink && (
            <a href={projectData.liveLink} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full flex items-center hover:from-purple-600 hover:to-pink-600 transition-colors duration-300">
              <FaExternalLinkAlt className="mr-2" /> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;