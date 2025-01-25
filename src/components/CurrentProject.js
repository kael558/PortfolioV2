import { FaExternalLinkAlt } from "react-icons/fa";
import { formatDateRange, getProgressBarColor } from "../Utils";

const CurrentProject = ({ project, handleNavigate }) => {
	return (
		<div
			className={`bg-gray-800 rounded-lg p-6 mb-8 transform transition duration-200 hover:scale-105 hover:shadow-2xl ${project.has_project_details ? "cursor-pointer" : ""
				}`}
			onClick={(e) => project.has_project_details && handleNavigate(e, project)}
		>
			<div className="flex flex-col md:flex-row h-full">
				<img
					src={`${process.env.PUBLIC_URL}/projects/${project.folder}/cover.png`}
					alt={project.title}
					className="w-full md:w-1/3 h-48 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
				/>
				<div className="flex-1 flex flex-col justify-between">
					<div>
						<div className="flex justify-between items-center mb-2">
							<h3 className="text-lg md:text-2xl font-semibold text-purple-300 tracking-wide">
								{project.title}
							</h3>
							{project.has_project_details && (
								<button
									onClick={(e) => handleNavigate(e, project)}
									className="text-sm md:text-base text-pink-400 hover:text-pink-300 transition-colors duration-300"
								>
									View More Details{" "}
									<FaExternalLinkAlt className="inline ml-1" />
								</button>
							)}
						</div>
						<p className="text-sm md:text-base text-gray-400 mb-4">{project.description}</p>


					</div>

					<div className="mt-auto">
						{project.percentComplete === 0 ? (
							<div className="text-sm text-yellow-400 font-semibold">
								Future Project
							</div>
						) : (
							<>
								<div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
									<div
										className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full transition-all duration-500 ease-out"
										style={{
											width: `${project.percentComplete}%`,
										}}
									></div>
								</div>

								<div className="flex justify-between items-center">
									<div className="flex items-center gap-2">
										<span
											className={`text-xs md:text-sm ${project.deferred ? 'line-through' : ''} ${getProgressBarColor(
												project.percentComplete
											)}`}
										>
											{project.percentComplete}% Complete
										</span>
										{project.deferred && (
											<span className="text-xs px-2 py-0.5 bg-gray-700 text-gray-300 rounded">
												Deferred
											</span>
										)}
									</div>
									<span className="text-xs md:text-sm text-gray-400">
										{formatDateRange(project.date)}
									</span>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CurrentProject;
