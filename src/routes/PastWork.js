import { useSpring, useTrail, animated, config } from "react-spring";
import { FaArrowUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import projects from "../ProjectData";
import { useFirstVisit, formatDateRange, getProgressBarColor } from "../Utils";
import BackToTop from "../components/BackToTop";
import PastProject from "../components/PastProject";

import React, { useEffect, useState } from "react";

let otherProjects = projects.filter((p) => !p.required_investment);
otherProjects.forEach((project, id) => project.id = id);
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

const PastProjectsPage = () => {
	const navigate = useNavigate();

	const isFirstVisit = useFirstVisit();

	const [filter, setFilter] = useState("All");
	const [filteredProjects, setFilteredProjects] = useState(otherProjects);


	useEffect(() => {
		if (filter === "All") {
			setFilteredProjects(otherProjects);
		} else {
			setFilteredProjects(
				otherProjects.filter((project) => project.tags.includes(filter))
			);
		}
	}, [filter, otherProjects]);

	const uniqueTags = [
		"All",
		...new Set(otherProjects.flatMap((project) => project.tags)),
	];

	useEffect(() => {
		const savedScrollPosition = sessionStorage.getItem(
			"pastProjectsScrollPosition"
		);
		if (savedScrollPosition) {
			window.scrollTo(0, parseInt(savedScrollPosition, 10));
		}
		sessionStorage.removeItem("pastProjectsScrollPosition");
	}, []);


	const handleNavigate = (e, project) => {
		e.preventDefault();
		e.stopPropagation();

		// Save the scroll position
		sessionStorage.setItem("pastProjectsScrollPosition", window.scrollY);

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

	const trail = useTrail(filteredProjects.length, {
		to: { opacity: 1, transform: "translateY(0)" },
		from: { opacity: 0, transform: "translateY(20px)" },
		config: config.gentle,
		delay: (i) => i * 100 + 200, // Staggered delay
        reset: true
	});

	return (
		<div className="min-h-screen bg-gray-900 text-gray-100  pb-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-5xl mx-auto">
				<animated.p
					style={taglineAnimation}
					className="text-2xl text-center text-gray-300 mb-4 font-light"
				>
					<span className="">
						I've worked on a lot of projects ranging from Data Science & AI to
						Web Development. Here are some of the projects I've worked on.
					</span>
				</animated.p>

				<animated.div style={projectSectionAnimation}>
					<h2 className="text-3xl font-bold mt-12 mb-8 text-gray-100">
						Past Work
					</h2>
					<div className="mb-8">
						<h3 className="text-xl font-semibold mb-4">Filter by:</h3>
						<div className="flex flex-wrap gap-2">
							{uniqueTags.map((tag) => (
								<button
									key={tag}
									onClick={() => setFilter(tag)}
									className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
										filter === tag
											? "bg-purple-600 text-white"
											: "bg-gray-700 text-gray-300 hover:bg-gray-600"
									}`}
								>
									{tag}
								</button>
							))}
						</div>
					</div>
					<div  className="grid md:grid-cols-2 gap-8">
						{trail.map((style, index) => (
							<animated.div key={filteredProjects[index].id} style={style}>
								<PastProject
									project={filteredProjects[index]}
									handleNavigate={handleNavigate}
								/>
							</animated.div>
						))}
					</div>
				</animated.div>
			</div>
			<BackToTop />
		</div>
	);
};

export default PastProjectsPage;
