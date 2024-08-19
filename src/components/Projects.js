import { useSpring, useTrail, animated, config } from "react-spring";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useFirstVisit, formatDateRange, getProgressBarColor } from "../Utils";

const Projects = ({ title, projects, handleNavigate, isFirstVisit }) => {
	const projectSectionAnimation = useSpring({
		opacity: 1,
		transform: "translateY(0)",
		from: isFirstVisit ? { opacity: 0, transform: "translateY(50px)" } : {},
		config: config.gentle,
		delay: isFirstVisit ? 1200 : 0,
	});

	const trail = useTrail(projects.length, {
		to: { opacity: 1, transform: "translateY(0)" },
		from: isFirstVisit ? { opacity: 0, transform: "translateY(20px)" } : {},
		config: config.gentle,
		delay: 200,
	});

	return (
		<animated.div style={projectSectionAnimation}>
			<h2 className="text-3xl font-bold mt-16 mb-8 text-gray-100">{title}</h2>

			{trail.map((style, index) => (
				<animated.div key={index} style={style}>
					<div className="bg-gray-800 rounded-lg p-6 mb-8 transform transition duration-200 hover:scale-105 hover:shadow-2xl">
						<div className="flex flex-col md:flex-row h-full">
							<img
								src={`${process.env.PUBLIC_URL}/projects/${projects[index].folder}/cover.png`}
								alt={projects[index].title}
								className="w-full md:w-1/3 h-48 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
							/>
							<div className="flex-1 flex flex-col justify-between">
								<div>
									<div className="flex justify-between items-center mb-2">
										<h3 className="text-2xl font-semibold text-purple-300 tracking-wide">
											{projects[index].title}
										</h3>
										{projects[index].has_project_details && (
											<button
												onClick={() => handleNavigate(projects[index])}
												className="text-pink-400 hover:text-pink-300 transition-colors duration-300"
											>
												View More Details{" "}
												<FaExternalLinkAlt className="inline ml-1" />
											</button>
										)}
									</div>
									<p className="text-gray-400 mb-4">
										{projects[index].description}
									</p>

                                    <div className="flex justify-between items-center mb-2">
										<span className="text-sm text-gray-400">
											Looking for: $
											{projects[index].required_investment.toLocaleString()}
										</span>
										
									</div>
								</div>

								<div className="mt-auto">
									

									<div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
										<div
											className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full transition-all duration-500 ease-out"
											style={{
												width: `${projects[index].percentComplete}%`,
											}}
										></div>
									</div>

									<div className="flex justify-between items-center">
										<span
											className={`text-sm ${getProgressBarColor(
												projects[index].percentComplete
											)}`}
										>
											{projects[index].percentComplete}% Complete
										</span>
                                        <span className="text-sm text-gray-400">
											{formatDateRange(projects[index].date)}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</animated.div>
			))}
		</animated.div>
	);
};

export default Projects;
