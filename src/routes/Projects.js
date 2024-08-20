import { useSpring, useTrail, animated, config } from "react-spring";
import { FaArrowUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import projects from "../ProjectData";
import { useFirstVisit, formatDateRange, getProgressBarColor } from "../Utils";
import NavigationBar from "../components/NavigationBar";
import CurrentProject from "../components/CurrentProject";
import PastProject from "../components/PastProject";

import React, { useEffect, useState } from "react";

const ProjectsPage = () => {
	const navigate = useNavigate();
	const [showBackToTop, setShowBackToTop] = useState(false);

	const isFirstVisit = useFirstVisit();
	let [projectsLookingForInvestment, otherProjects] = projects.reduce(
		(acc, p) => {
			acc[p.required_investment ? 0 : 1].push(p);
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
		const savedScrollPosition = sessionStorage.getItem(
			"projectsScrollPosition"
		);
		if (savedScrollPosition) {
			window.scrollTo(0, parseInt(savedScrollPosition, 10));
		}
		sessionStorage.removeItem("projectsScrollPosition");
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			setShowBackToTop(window.pageYOffset > 300);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	const backToTopAnimation = useSpring({
		opacity: showBackToTop ? 1 : 0,
		transform: showBackToTop ? "translateY(0)" : "translateY(100px)",
		config: config.wobbly,
	});

	const handleNavigate = (project) => {
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

	const trail = useTrail(projectsLookingForInvestment.length, {
		to: { opacity: 1, transform: "translateY(0)" },
		from: isFirstVisit ? { opacity: 0, transform: "translateY(20px)" } : {},
		config: config.gentle,
		delay: 200,
	});

	return (
		<div className="min-h-screen bg-gray-900 text-gray-100  pb-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-5xl mx-auto">
				<animated.p
					style={taglineAnimation}
					className="text-2xl text-center text-gray-300 mb-4 font-light"
				>
					<span className="">
						Fluent Future is a language learning app for newcomers to Canada. It
						features pronunciation analysis, roleplay scenarios, and
						personalized learning pathways. We are currently developing the MVP
						and testing with our focus groups in Ottawa. I am looking for
						investors to speed up the development of this app.
						<br /> <br />I am also creating a suite of developer tools targeted
						at the emerging market of non-technical developers. As generative AI
						becomes more accessible, I believe these tools will be essential for
						the next generation of developers. I am looking for investors to
						help speed up the development of these tools.
					</span>
				</animated.p>

				<animated.div style={projectSectionAnimation}>
					<h2 className="text-3xl font-bold mt-16 mb-8 text-gray-100">
						Current Investment Opportunities
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
				</animated.div>
			</div>
			<animated.button
				style={backToTopAnimation}
				onClick={scrollToTop}
				className="fixed bottom-8 right-8 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-300"
				aria-label="Back to top"
			>
				<FaArrowUp />
			</animated.button>
		</div>
	);
};

export default ProjectsPage;
