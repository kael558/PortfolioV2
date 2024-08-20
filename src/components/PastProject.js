import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { formatDateRange, getTagColor } from "../Utils";

const PastProject = ({ project, handleNavigate }) => {
	return (
		<div
			className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition duration-200 hover:scale-105 hover:shadow-2xl ${project.has_project_details ?'cursor-pointer':''}`}
			onClick={(e) => project.has_project_details && handleNavigate(e, project)}
		>
			<img
				src={`${process.env.PUBLIC_URL}/projects/${project.folder}/cover.png`}
				alt={project.title}
				className="w-full h-48 object-cover"
			/>
			<div className="p-6">
				<h3 className="text-xl font-semibold mb-2 text-purple-300">
					{project.title}
				</h3>
				<p className="text-gray-400 mb-4">{project.description}</p>
				{project.tags && project.tags.length > 0 && (
					<div className="mb-4">
						{project.tags.map((tag, tagIndex) => (
							<span
								key={tagIndex}
								className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 opacity-90 ${getTagColor(
									tag
								)} ${(tag === "Launched" && project.link) || (tag === "Video" && project.video) ? 'cursor-pointer hover:opacity-100' : ''}`}
								onClick={(e) => {
									e.stopPropagation();
									if (tag === "Launched" && project.link) {
										window.open(project.link, '_blank', 'noopener,noreferrer');
									} else if (tag === "Video" && project.video) {
										window.open(project.video, '_blank', 'noopener,noreferrer');
									}
								}}
							>
								{tag}
								{((tag === "Launched" && project.link) || (tag === "Video" && project.video)) && (
									<FaExternalLinkAlt className="inline-block text-xs ml-1" />
								)}
							</span>
						))}
					</div>
				)}

				{project.has_project_details && (
					<button
						onClick={(e) => handleNavigate(e, project)}
						className="text-pink-400 hover:text-pink-300 transition-colors duration-300"
					>
						View More Details <FaExternalLinkAlt className="inline ml-1" />
					</button>
				)}
				<div className="text-right text-sm text-gray-400 mt-2">
					{formatDateRange(project.date)}
				</div>
			</div>
		</div>
	);
};

export default PastProject;