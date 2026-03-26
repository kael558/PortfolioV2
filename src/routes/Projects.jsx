import { useSpring, useTrail, animated, config } from "react-spring";
import { FaArrowUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import projects from "../ProjectData";
import { useFirstVisit, formatDateRange, getProgressBarColor } from "../Utils";
import NavigationBar from "../components/NavigationBar";
import CurrentProject from "../components/CurrentProject";
import PastProject from "../components/PastProject";
import BackToTop from "../components/BackToTop";

import React, { useEffect, useState } from "react";


let [currentProjects, _] = projects.reduce(
	(acc, p) => {
		acc[p.percentComplete < 100 ? 0 : 1].push(p);
		return acc;
	},
	[[], []]
);


currentProjects.sort((a, b) => {
	// Future projects (percentComplete = 0) go last
	if (a.percentComplete === 0 && b.percentComplete !== 0) return 1;
	if (b.percentComplete === 0 && a.percentComplete !== 0) return -1;

	// Deferred projects (has property `deferred`) go second last
	if (a.deferred && !b.deferred) return 1;
	if (b.deferred && !a.deferred) return -1;

	// Sort by percent complete (higher percentComplete first)
	if (a.percentComplete !== b.percentComplete) {
		return b.percentComplete - a.percentComplete;
	}

	// If all else is equal, sort by date
	if (!a.date) return 1; // No date means project hasn't started yet
	if (!b.date) return -1;

	const dateA = typeof a.date === "string" ? a.date : a.date?.to ?? a.date?.from;
	const dateB = typeof b.date === "string" ? b.date : b.date?.to ?? b.date?.from;
	return dateB.localeCompare(dateA); // Later dates come first
});

const ProjectsPage = () => {
	const navigate = useNavigate();

	const isFirstVisit = useFirstVisit();


	const savedScrollPosition = sessionStorage.getItem(
		"scrollPosition"
	);
	useEffect(() => {

		if (savedScrollPosition) {
			window.scrollTo(0, parseInt(savedScrollPosition, 10));
		} else {
			window.scrollTo(0, 0);
		}
		sessionStorage.removeItem("projectsScrollPosition");
	}, []);


	const handleNavigate = (e, project) => {
		e.preventDefault();
		e.stopPropagation();

		// Save the scroll position
		sessionStorage.setItem("projectsScrollPosition", window.scrollY);

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

	const taglineAnimation = useSpring({
		opacity: 1,
		from: isFirstVisit ? { opacity: 0 } : {},
		config: config.molasses,
		delay: isFirstVisit ? 900 : 0,
	});

	const projectSectionAnimation = useSpring({
		opacity: 1,
		transform: "translateY(0)",
		from: isFirstVisit ? { opacity: 0, transform: "translateY(50px)" } : {},
		config: config.gentle,
		delay: isFirstVisit ? 1200 : 0,
	});


	const trail = useTrail(currentProjects.length, {
		to: { opacity: 1, transform: "translateY(0)" },
		from: savedScrollPosition ? {} : { opacity: 0, transform: "translateY(20px)" },
		config: config.gentle,
		delay: savedScrollPosition ? 0 : 100,
		reset: false
	});

	return (
		<div className="min-h-screen bg-gray-900 text-gray-100  pb-12 px-4 sm:px-6 lg:px-8">
			<Helmet>
				<title>Current Projects — Rahel Gunaratne</title>
				<meta name="description" content="Rahel Gunaratne's active projects, including Fluent Future — a language learning platform for Ottawa newcomers featuring pronunciation analysis and AI tutoring." />
				<meta property="og:title" content="Current Projects — Rahel Gunaratne" />
				<meta property="og:description" content="Rahel Gunaratne's active projects, including Fluent Future — a language learning platform for Ottawa newcomers." />
				<meta property="og:url" content="https://rahelgunaratne.com/projects" />
				<meta property="og:type" content="website" />
				<link rel="canonical" href="https://rahelgunaratne.com/projects" />
			</Helmet>
			<div className="max-w-5xl mx-auto">
				<animated.p
					style={taglineAnimation}
					className="text-lg md:text-2xl text-center text-gray-300 mb-4 font-light"
				>
					<span className="">
						I love to work on projects in my spare time. I am currently working on a
						language learning app called "Fluent Future" for newcomers to Canada. It
						features pronunciation analysis, roleplay scenarios, and
						an AI tutor. I am currently developing the MVP
						and testing it with focus groups in Ottawa.
					</span>
				</animated.p>

				<animated.div style={projectSectionAnimation}>
					<h2 className="text-2xl md:text-3xl font-bold mt-16 mb-8 text-gray-100">
						Current Projects
					</h2>

					{trail.map((style, index) => (
						<animated.div key={index} style={style}>
							<CurrentProject
								key={index}
								project={currentProjects[index]}
								handleNavigate={handleNavigate}
							/>
						</animated.div>
					))}
				</animated.div>


			</div>
			<BackToTop />
		</div>
	);
};

export default ProjectsPage;
