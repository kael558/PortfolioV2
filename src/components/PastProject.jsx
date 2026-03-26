import React, { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { formatDateRange, getTagColor } from "../Utils";

const ProjectCoverImage = ({ project }) => {
	const [imageError, setImageError] = useState(false);
	const hasValidFolder = project.folder;

	if (!hasValidFolder || imageError) {
		return (
			<div className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-b border-gray-700/50 shrink-0">
				<span className="text-5xl font-bold text-gray-600/50">
					{project.title.charAt(0)}
				</span>
			</div>
		);
	}

	return (
		<img
			src={`${process.env.PUBLIC_URL}/projects/${project.folder}/cover.png`}
			alt={project.title}
			className="w-full h-48 object-cover"
			onError={() => setImageError(true)}
		/>
	);
};

const PastProject = ({ project, handleNavigate }) => {

	const getBadgeStyling = (placement) => {
		if (placement.includes('1st')) {
			return {
				background: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
				border: 'border-yellow-700',
				text: '🏆 1st Place'
			};
		} else if (placement.includes('2nd')) {
			return {
				background: 'bg-gradient-to-r from-gray-300 to-gray-500',
				border: 'border-gray-600',
				text: '🥈 2nd Place'
			};
		} else if (placement.includes('3rd')) {
			return {
				background: 'bg-gradient-to-r from-amber-500 to-amber-700',
				border: 'border-amber-800',
				text: '🥉 3rd Place'
			};
		} else {
			return {
				background: 'bg-gradient-to-r from-purple-400 to-purple-600',
				border: 'border-purple-700',
				text: '🎖️ ' + placement
			};
		}
	};
	return (
		<div
			className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition duration-200 hover:scale-105 hover:shadow-2xl ${project.has_project_details ? 'cursor-pointer' : ''}`}
			onClick={(e) => project.has_project_details && handleNavigate(e, project)}
		>

			{project.placement && (
				<div className="absolute top-0 right-0 z-10">
					{/* Ribbon Badge */}
					<div
						className={`
              ${getBadgeStyling(project.placement).background}
              py-1 px-4 
              text-white text-sm font-bold
			  rounded-bl-lg
			  border 
			  border-slate-700
			  
			  shadow-lg 
			
  
              relative
    
              before:${getBadgeStyling(project.placement).border}
            `}
					>
						{getBadgeStyling(project.placement).text}
					</div>
				</div>
			)}
			<ProjectCoverImage project={project} />
			<div className="p-4 md:p-6">
				<h3 className="text-lg md:text-xl font-semibold mb-2 text-purple-300">
					{project.title}
				</h3>
				<p className="text-sm md:text-base text-gray-400 mb-4">{project.description}</p>
				{project.tags && project.tags.length > 0 && (
					<div className="mb-2 md:mb-4">
						{project.tags.map((tag, tagIndex) => (
							<span
								key={tagIndex}
								className={`inline-block rounded-full px-3 py-1 text-xs md:text-sm font-semibold mr-2 mb-2 opacity-90 ${getTagColor(
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
						className="text-sm md:text-base text-pink-400 hover:text-pink-300 transition-colors duration-300"
					>
						View More Details <FaExternalLinkAlt className="inline ml-1" />
					</button>
				)}
				<div className="text-xs md:text-sm text-right text-gray-400 mt-2">
					{formatDateRange(project.date)}
				</div>
			</div>
		</div>
	);
};

export default PastProject;