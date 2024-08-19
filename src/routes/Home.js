import { FaGithub, FaLinkedin, FaExternalLinkAlt } from "react-icons/fa";
import { useSpring, animated, config, useTrail } from "react-spring";
import projects from "../ProjectData";
import { useNavigate } from "react-router-dom";

import React, { useState, useEffect } from "react";
import { useFirstVisit, formatDateRange } from "../Utils";

import Projects from "../components/Projects";

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

	let [projectsLookingForInvestment, otherProjects] = projects.reduce(
		(acc, p) => {
			acc[p.required_investment ? 0 : 1].push(
				p
			);
			return acc;
		},
		[[], []]
	);

	otherProjects.sort((a, b) => {
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
					className="text-2xl text-center text-gray-300 mb-4 font-light"
				>
					I create and sell{" "}
					<span className="text-purple-400 font-normal">SaaS</span> and{" "}
					<span className="text-pink-400 font-normal">AI products</span>.
					<br /> <br />
					<span className="">
						I’m a Software Engineering graduate with high distinction, holding
						minors in Computer Science and Physics. I’ve won 3 Generative AI
						Hackathons and have over 2 years of experience as a Software/AI
						contractor. Currently, I’m focused on entrepreneurship, with two
						product launches and more in the pipeline.
					</span>
					<br /> <br />
					<span className="">
						Fluent Future is a language learning app for newcomers to Canada. It 
						features pronunciation analysis, relevant roleplay scenarios, and 
						personalized learning pathways. We are currently developing the MVP and testing 
						with our focus groups in Ottawa. I am looking for investors to speed up the 
						development of this app.

						<br /> <br />

						I am also creating a suite of developer tools targeted at the emerging market of
						non-technical developers. As generative AI becomes more accessible, I believe
						these tools will be essential for the next generation of developers. I am looking
						for investors to help speed up the development of these tools.
					</span>
				</animated.p>

				<Projects title="Current Investment Opportunities" projects={projectsLookingForInvestment} handleNavigate={handleNavigate} isFirstVisit={isFirstVisit} />

				<animated.div style={projectSectionAnimation}>
					<h2 className="text-3xl font-bold mt-16 mb-8 text-gray-100">
						Other Projects
					</h2>
					<div className="grid md:grid-cols-2 gap-8">
						{otherProjects.map((project, index) => (
							<div
								key={index}
								className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition duration-200 hover:scale-105 hover:shadow-2xl"
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
											View More Details <FaExternalLinkAlt className="inline ml-1" />
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
