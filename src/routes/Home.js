import {
	FaGithub,
	FaLinkedin,
	FaExternalLinkAlt,
} from "react-icons/fa";
import { useSpring, animated, config, useTrail } from "react-spring";
import projects from "../ProjectData";
import { useNavigate } from "react-router-dom";

import React, { useState, useEffect } from "react";

const useFirstVisit = () => {
	const [isFirstVisit, setIsFirstVisit] = useState(true);

	useEffect(() => {
		const hasVisited = localStorage.getItem("hasVisitedBefore");
		if (!hasVisited) {
			localStorage.setItem("hasVisitedBefore", "true");
		} else {
			setIsFirstVisit(false);
		}
	}, []);

	return isFirstVisit;
};

const getProgressBarColor = (percentage) => {
	if (percentage < 50) return "text-red-500";
	if (percentage < 80) return "text-orange-500";
	return "text-green-500";
};

function getTimeDifference(date) {
	const now = new Date();
	const then = new Date(date);
	const diffMonths =
		(now.getFullYear() - then.getFullYear()) * 12 +
		now.getMonth() -
		then.getMonth();

	if (diffMonths < 12) {
		return `${diffMonths} month${diffMonths !== 1 ? "s" : ""} ago`;
	} else {
		const years = Math.floor(diffMonths / 12);
		return `${years} year${years !== 1 ? "s" : ""} ago`;
	}
}

function formatDateRange(date) {
	if (!date) {
		return "Not started yet";
	} else if (typeof date === "string") {
		return getTimeDifference(date);
	} else if (date.to) {
		return getTimeDifference(date.to);
	} else {
		return `Started ${getTimeDifference(date.from)}`;
	}
}

const getTagColor = (tag) => {
	const colors = {
		Personal: "bg-blue-500 text-white",
		Archived: "bg-gray-500 text-white",
		Work: "bg-green-500 text-white",
		Education: "bg-yellow-500 text-black",
		Contract: "bg-indigo-600 text-white",
		Learning: "bg-teal-500 text-white",
		Tool: "bg-orange-500 text-white",
		School: "bg-pink-500 text-white",
		Research: "bg-cyan-600 text-white",
		Startup: "bg-red-600 text-white",
		Hackathon: "bg-purple-600 text-white",
		Hobby: "bg-emerald-500 text-white",
		Launched: "bg-blue-500 text-white",
		Video: "bg-rose-500 text-white",
	};
	return colors[tag] || "bg-gray-500 text-white"; // Default color
};

const HomePage = () => {
	const navigate = useNavigate();

	const isFirstVisit = useFirstVisit();

	// completed projects sorted by date (note that date is a string in the format "YYYY-MM" or object with from and to keys)
	const completedProjects = projects
		.filter((p) => p.percentComplete === 100)
		.sort((a, b) => {
			if (!a.date)
				// if no date is provided, assume it hasn't started yet
				return 1;
			if (!b.date) return -1;

			const dateA =
				typeof a.date === "string" ? a.date : a.date?.to ?? a.date?.from;
			const dateB =
				typeof b.date === "string" ? b.date : b.date?.to ?? b.date?.from;
			return dateB.localeCompare(dateA);
		});

	// in-progress projects sorted by date started in descending order
	const inProgressProjects = projects
		.filter((p) => p.percentComplete < 100)
		.sort((a, b) => {
			if (!a.date)
				// if no date is provided, assume it hasn't started yet
				return 1;
			if (!b.date) return -1;

			const dateA = a.date.from;
			const dateB = b.date.from;
			return dateB.localeCompare(dateA);
		});

	useEffect(() => {
		const savedScrollPosition = sessionStorage.getItem("scrollPosition");
		if (savedScrollPosition) {
			window.scrollTo(0, parseInt(savedScrollPosition, 10));
		}
		sessionStorage.removeItem("scrollPosition");
	}, []);

	const handleNavigate = (project) => {
		// Save the scroll position
		sessionStorage.setItem("scrollPosition", window.scrollY);

		// Navigate to the project page
		navigate(
			`/project/${encodeURIComponent(
				project.title.replace(/\s+/g, "-").toLowerCase()
			)}`,
			{
				state: { projectData: project },
			}
		);
	};

	const headerAnimation = useSpring({
		opacity: 1,
		transform: "translateY(0)",
		from: isFirstVisit ? { opacity: 0, transform: "translateY(-50px)" } : {},
		config: config.gentle,
		delay: isFirstVisit ? 300 : 0,
	});

	// Animation for the social icons
	const socialAnimation = useSpring({
		opacity: 1,
		transform: "scale(1)",
		from: isFirstVisit ? { opacity: 0, transform: "scale(0.5)" } : {},
		config: config.wobbly,
		delay: isFirstVisit ? 600 : 0,
	});

	// Animation for the tagline
	const taglineAnimation = useSpring({
		opacity: 1,
		from: isFirstVisit ? { opacity: 0 } : {},
		config: config.molasses,
		delay: isFirstVisit ? 900 : 0,
	});

	// Animation for the project sections
	const projectSectionAnimation = useSpring({
		opacity: 1,
		transform: "translateY(0)",
		from: isFirstVisit ? { opacity: 0, transform: "translateY(50px)" } : {},
		config: config.gentle,
		delay: isFirstVisit ? 1200 : 0,
	});

	const trail = useTrail(inProgressProjects.length, {
		to: { opacity: 1, transform: "translateY(0)" },
		from: isFirstVisit ? { opacity: 0, transform: "translateY(20px)" } : {},
		config: config.gentle,
		delay: 200,
	});

	return (
		<div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-5xl mx-auto">
				<animated.div style={headerAnimation}>
					<h1 className="text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8">
						Rahel Gunaratne
					</h1>
				</animated.div>
				<animated.div style={socialAnimation}>
					<div className="flex justify-center space-x-6 mb-12">
						<a
							href="https://github.com/kael558"
							className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
						>
							<FaGithub size={28} />
						</a>
						<a
							href="https://www.linkedin.com/in/rahelgunaratne/"
							className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
						>
							<FaLinkedin size={28} />
						</a>
					</div>
				</animated.div>

				<animated.p
					style={taglineAnimation}
					className="text-2xl text-center text-gray-300 mb-16 font-light"
				>
					I create and sell{" "}
					<span className="text-purple-400 font-normal">SaaS</span> and{" "}
					<span className="text-pink-400 font-normal">AI products</span>
				</animated.p>

				<animated.div style={projectSectionAnimation}>
					<h2 className="text-3xl font-bold mb-8 text-gray-100">
						Current Projects
					</h2>

					{trail.map((style, index) => (
						<animated.div key={index} style={style}>
							{/* Single project card */}
							<div className="bg-gray-800 rounded-lg p-6 mb-8 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
								<div className="flex flex-col md:flex-row items-center">
									<img
										src={`${process.env.PUBLIC_URL}/projects/${inProgressProjects[index].folder}/cover.png`}
										alt={inProgressProjects[index].title}
										className="w-full md:w-1/3 h-48 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
									/>
									<div className="flex-1 relative">
										<div className="flex justify-between items-center mb-2">
											<h3 className="text-2xl font-semibold text-purple-300 tracking-wide">
												{inProgressProjects[index].title}
											</h3>
											{inProgressProjects[index].has_project_details && (
												<button
													onClick={() =>
														handleNavigate(inProgressProjects[index])
													}
													className="text-pink-400 hover:text-pink-300 transition-colors duration-300"
												>
													View Project{" "}
													<FaExternalLinkAlt className="inline ml-1" />
												</button>
											)}
										</div>
										<p className="text-gray-400 mb-4">
											{inProgressProjects[index].description}
										</p>
										{inProgressProjects[index].tags &&
											inProgressProjects[index].tags.length > 0 && (
												<div className="mb-4">
													{inProgressProjects[index].tags.map(
														(tag, tagIndex) => (
															<span
																key={tagIndex}
																className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 opacity-90 ${getTagColor(
																	tag
																)}`}
															>
																{tag}
																{tag === "Launched" &&
																	inProgressProjects[index].link && (
																		<a
																			href={inProgressProjects[index].link}
																			target="_blank"
																			rel="noopener noreferrer"
																			className="ml-1 inline-block"
																		>
																			<FaExternalLinkAlt className="inline-block text-xs" />
																		</a>
																	)}
																	{tag === "Video" && inProgressProjects[index].video && (
														<a
															href={inProgressProjects[index].video}
															target="_blank"
															rel="noopener noreferrer"
															className="ml-1 inline-block"
														>
															<FaExternalLinkAlt className="inline-block text-xs" />
														</a>
													)}
															</span>
														)
													)}
												</div>
											)}
										<div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
											<div
												className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full transition-all duration-500 ease-out"
												style={{
													width: `${inProgressProjects[index].percentComplete}%`,
												}}
											></div>
										</div>
										<div className="flex justify-between items-center">
											<span
												className={`text-sm ${getProgressBarColor(
													inProgressProjects[index].percentComplete
												)}`}
											>
												{inProgressProjects[index].percentComplete}% Complete
											</span>
											<div className="text-right text-sm text-gray-400 mt-2">
												{formatDateRange(inProgressProjects[index].date)}
											</div>
										</div>
									</div>
								</div>
							</div>
						</animated.div>
					))}

					<h2 className="text-3xl font-bold mt-16 mb-8 text-gray-100">
						Past Projects
					</h2>
					<div className="grid md:grid-cols-2 gap-8">
						{completedProjects.map((project, index) => (
							<div
								key={index}
								className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl"
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
													)}`}
												>
													{tag}
													{tag === "Launched" && project.link && (
														<a
															href={project.link}
															target="_blank"
															rel="noopener noreferrer"
															className="ml-1 inline-block"
														>
															<FaExternalLinkAlt className="inline-block text-xs" />
														</a>
													)}
													{tag === "Video" && project.video && (
														<a
															href={project.video}
															target="_blank"
															rel="noopener noreferrer"
															className="ml-1 inline-block"
														>
															<FaExternalLinkAlt className="inline-block text-xs" />
														</a>
													)}
												</span>
											))}
										</div>
									)}

									{project.has_project_details && (
										<button
											onClick={() => handleNavigate(project)}
											className="text-pink-400 hover:text-pink-300 transition-colors duration-300"
										>
											View Project <FaExternalLinkAlt className="inline ml-1" />
										</button>
									)}
									<div className="text-right text-sm text-gray-400 mt-2">
										{formatDateRange(project.date)}
									</div>
								</div>
							</div>
						))}
					</div>
				</animated.div>
			</div>
		</div>
	);
};

export default HomePage;
