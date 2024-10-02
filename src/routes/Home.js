import { FaGithub, FaLinkedin, FaCalendar } from "react-icons/fa";
import { useSpring, animated, config, useTrail } from "react-spring";
import projects from "../ProjectData";
import { useNavigate, Link } from "react-router-dom";

import React, { useState, useEffect } from "react";
import { useFirstVisit, formatDateRange } from "../Utils";

import NavigationBar from "../components/NavigationBar";
import CurrentProject from "../components/CurrentProject";
import PastProject from "../components/PastProject";

const HomePage = () => {
	const isFirstVisit = useFirstVisit();
	const navigate = useNavigate();

	let [projectsLookingForInvestment, otherProjects] = projects.reduce(
		(acc, p) => {
			acc[(p.percentComplete < 100 && p.percentComplete > 0) ? 0 : 1].push(p);
			return acc;
		},
		[[], []]
	);

	projectsLookingForInvestment = [projects[23], projects[25], projects[24]];
	//projectsLookingForInvestment = projectsLookingForInvestment.splice(0, 3);

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

	otherProjects = otherProjects.splice(0, 4);

	useEffect(() => {
		const savedScrollPosition = sessionStorage.getItem("homeScrollPosition");
		if (savedScrollPosition) {
			window.scrollTo(0, parseInt(savedScrollPosition, 10));
		}
		sessionStorage.removeItem("homeScrollPosition");
	}, []);

	const handleNavigate = (e, project) => {
		e.preventDefault();
		e.stopPropagation();
		
		// Save the scroll position
		sessionStorage.setItem("homeScrollPosition", window.scrollY);

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

	const trail = useTrail(projectsLookingForInvestment.length, {
		to: { opacity: 1, transform: "translateY(0)" },
		from: isFirstVisit ? { opacity: 0, transform: "translateY(20px)" } : {},
		config: config.gentle,
		delay: 200,
	});

	return (
		<div className="min-h-screen bg-gray-900 text-gray-100 pb-12 px-4 sm:px-6 lg:px-8">
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
						<a
							href="https://calendly.com/rahel-gunaratne"
							className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
						>
							<FaCalendar size={28} />
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
						I'm a Software Engineering graduate with high distinction, holding
						minors in Computer Science and Physics. I've won 3 Generative AI
						Hackathons and have over 2 years of experience as a Software/AI
						contractor. Currently, I'm focused on entrepreneurship, with two
						product launches and more in the pipeline.
					</span>
				</animated.p>

				<animated.div style={projectSectionAnimation}>
					<h2 className="text-3xl font-bold mt-16 mb-8 text-gray-100">
						Current Projects
					</h2>

					{trail.map((style, index) => (
						<animated.div key={index} style={style}>
							<CurrentProject
								key={index}
								project={projectsLookingForInvestment[index]}
								handleNavigate={handleNavigate}
							/>
						</animated.div>
					))}
					<div className="mt-8 text-center">
                    <Link 
                        to="/projects" 
                        className="inline-block text-purple-400 hover:text-purple-300 transition-colors duration-300 group"
                    >
                        See more 
                        <span className="ml-2 group-hover:ml-3 transition-all duration-300">→</span>
                    </Link>
                </div>
				</animated.div>

				<animated.div style={projectSectionAnimation}>
					<h2 className="text-3xl font-bold mt-16 mb-8 text-gray-100">
						Other Projects
					</h2>
					<div className="grid md:grid-cols-2 gap-8">
						{otherProjects.map((project, index) => (
							<PastProject
								key={index}
								project={project}
								handleNavigate={handleNavigate}
							/>
						))}
					</div>
					<div className="mt-8 text-center">
                    <Link 
                        to="/projects" 
                        className="inline-block text-purple-400 hover:text-purple-300 transition-colors duration-300 group"
                    >
                        See more 
                        <span className="ml-2 group-hover:ml-3 transition-all duration-300">→</span>
                    </Link>
                </div>
				</animated.div>
			</div>
		</div>
	);
};

export default HomePage;
