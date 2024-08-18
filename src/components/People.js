import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin, FaGlobe } from 'react-icons/fa';

const socialIcons = {
  github: FaGithub,
  twitter: FaTwitter,
  linkedin: FaLinkedin,
  default: FaGlobe,
};

const SocialIcon = ({ platform }) => {
  const Icon = socialIcons[platform.toLowerCase()] || socialIcons.default;
  return <Icon className="inline-block mr-2" />;
};

const People = ({ children }) => {
  const people = JSON.parse(children);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {people.map((person, index) => (
        <div key={index} className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-purple-500">
          <h5 className="text-xl font-semibold mb-2 text-purple-300">{person.name}</h5>
          <p className="text-pink-400 mb-1 font-medium">{person.role}</p>
          <p className="text-gray-300 mb-4">{person.job}</p>
          {person.socials && (
            <div className="mt-4">
             
              <ul className="list-none p-0 flex flex-wrap">
                {Object.entries(person.socials).map(([platform, url], idx) => (
                  <li key={idx} className="mb-2 mr-4">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-400 hover:text-pink-300 transition-colors duration-300 flex items-center"
                    >
                      <SocialIcon platform={platform} />
     
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default People;