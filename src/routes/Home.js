import React, { useEffect } from "react";
import {
	FaGithub,
	FaTwitter,
	FaLinkedin,
	FaExternalLinkAlt,
} from "react-icons/fa";

import projects from "../ProjectData";
import { useNavigate } from "react-router-dom";

const getProgressBarColor = (percentage) => {
	if (percentage < 50) return "text-red-500";
	if (percentage < 80) return "text-orange-500";
	return "text-green-500";
};

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
	};
	return colors[tag] || "bg-gray-500 text-white"; // Default color
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

const HomePage = () => {
	const navigate = useNavigate();

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

	return (
		<div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-5xl mx-auto">
				<h1 className="text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8">
					Rahel Gunaratne
				</h1>

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

				<p className="text-2xl text-center text-gray-300 mb-16 font-light">
					I create and sell{" "}
					<span className="text-purple-400 font-normal">SaaS</span> and{" "}
					<span className="text-pink-400 font-normal">AI products</span>
				</p>

				<h2 className="text-3xl font-bold mb-8 text-gray-100">
					Current Projects
				</h2>
				{inProgressProjects.map((project, index) => (
					<div
						key={index}
						className="bg-gray-800 rounded-lg p-6 mb-8 transform transition duration-500 hover:scale-105 hover:shadow-2xl"
					>
						<div className="flex flex-col md:flex-row items-center">
							<img
								src={`${process.env.PUBLIC_URL}/projects/${project.folder}/cover.png`}
								alt={project.title}
								className="w-full md:w-1/3 h-48 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
							/>
							<div className="flex-1">
								<h3 className="text-2xl font-semibold mb-2 text-purple-300">
									{project.title}
								</h3>
								<p className="text-gray-400 mb-4">{project.description}</p>
								{project.tags && project.tags.length > 0 && (
									<div className="mb-4">
										{project.tags.map((tag, tagIndex) => (
											<span
												key={tagIndex}
												className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 ${getTagColor(
													tag
												)}`}
											>
												{tag}
											</span>
										))}
									</div>
								)}
								<div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
									<div
										className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full transition-all duration-500 ease-out"
										style={{ width: `${project.percentComplete}%` }}
									></div>
								</div>
								<div className="flex justify-between items-center">
									<span
										className={`text-sm ${getProgressBarColor(
											project.percentComplete
										)}`}
									>
										{project.percentComplete}% Complete
									</span>

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
						</div>
					</div>
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
												className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 ${getTagColor(
													tag
												)}`}
											>
												{tag}
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
			</div>
		</div>
	);
};

export default HomePage;
