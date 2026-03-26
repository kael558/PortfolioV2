import { FaGithub, FaLinkedin, FaCalendar } from "react-icons/fa";
import { useSpring, animated, config, useTrail } from "react-spring";
import projects from "../ProjectData";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import React, { useState, useEffect } from "react";
import { useFirstVisit, formatDateRange } from "../Utils";

import NavigationBar from "../components/NavigationBar";
import CurrentProject from "../components/CurrentProject";
import PastProject from "../components/PastProject";

const HomePage = () => {
	const isFirstVisit = useFirstVisit();
	const navigate = useNavigate();

	let [currentProjects, otherProjects] = projects.reduce(
		(acc, p) => {
			acc[(p.percentComplete < 100 && p.percentComplete > 0) ? 0 : 1].push(p);
			return acc;
		},
		[[], []]
	);

	//currentProjects = [projects[23], projects[25], projects[24]];
	currentProjects = currentProjects.splice(0, 3);
	currentProjects = [currentProjects[1], currentProjects[0], currentProjects[2]];

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

	const trail = useTrail(currentProjects.length, {
		to: { opacity: 1, transform: "translateY(0)" },
		from: isFirstVisit ? { opacity: 0, transform: "translateY(20px)" } : {},
		config: config.gentle,
		delay: 200,
	});

	const Section = ({ children, delay }) => {
		const animation = useSpring({
			opacity: 1,
			transform: 'translateY(0)',
			from: {
				opacity: 0,
				transform: 'translateY(20px)'
			},

			delay: delay,
		});

		return (
			<animated.div style={animation}>
				{children}
			</animated.div>
		);
	};


	return (
		<div className="min-h-screen bg-gray-900 text-gray-100 pb-12 px-4 sm:px-6 lg:px-8">
			<Helmet>
				<title>Rahel Gunaratne — Software Engineer & AI Developer</title>
				<meta name="description" content="Portfolio of Rahel Gunaratne — software engineer specialising in AI, full-stack development, and data science. 5× AI hackathon winner, open to collaborations." />
				<meta property="og:title" content="Rahel Gunaratne — Software Engineer & AI Developer" />
				<meta property="og:description" content="Portfolio of Rahel Gunaratne — software engineer specialising in AI, full-stack development, and data science. 5× AI hackathon winner, open to collaborations." />
				<meta property="og:url" content="https://rahelgunaratne.com/" />
				<meta property="og:type" content="website" />
				<link rel="canonical" href="https://rahelgunaratne.com/" />
			</Helmet>
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
					className="text-xl md:text-2xl text-gray-300 mb-4 font-light leading-relaxed"
				>
					<span className="space-y-6">
						<Section delay={100}>
							Hi, I'm Rahel—a Software Engineering graduate with high distinction,
							with minors in Computer Science and Physics. My expertise spans AI, data science, and full-stack development.
							For the past 2 years, I've worked as a software developer taking on various contracts.
						</Section>
						<Section delay={200}>
							At the City of Ottawa, I specialized in data analytics and developed and sold
							a <a href="/project/automated-data-wrangling-pipeline" className="text-purple-400 hover:underline transition-all">data wrangling pipeline</a> saving significant time. Under the guidance of a supervisor, I also contributed to academic research,
							creating <a href="/project/visualizing-diversity" className="text-purple-400 hover:underline transition-all">impactful visualizations</a> focused on equity and diversity metrics.
						</Section>

						<Section delay={280}>
							I've won 5 AI hackathons, including those by {" "}
							<a href="/project/semantic-clustering-%26-searching-research-papers" className="text-purple-400 hover:underline transition-all">Cohere</a>,
							IBM, and {" "}
							<a href="/project/web-indexer" className="text-purple-400 hover:underline transition-all">AI21 Labs</a>.
							I also worked at an <a href="https://www.moemate.io/" className="text-purple-400 hover:underline transition-all">AI startup</a> as a full-stack developer, from early-stage development to launch.
						</Section>

						<Section delay={360}>
							Then I went on to launching some of my own projects within the last year including:
							<ul className="ml-4 mt-2">
								<li>
									PixPal
									{" "}— A 3D desktop AI companion for Windows and Mac
								</li>
								<li>
									<a href="/project/pixpal-website" className="text-pink-400 hover:underline transition-all">PixPal Website</a>
									{" "}— A roleplay-focused auditory experience web application
								</li>
								<li>
									<a href="https://webindexer.app" className="text-pink-400 hover:underline transition-all">Web Indexer</a>
									{" "}— An AI chatbot tool for websites reducing customer queries by 80% and increasing conversion by 30%
								</li>
							</ul>
						</Section>

						<Section delay={420}>
							Currently, I'm developing a <a href="/project/fluent-future" className="text-purple-400 hover:underline transition-all">language learning platform</a> for Ottawa newcomers,
							informed by community feedback and real user needs.
						</Section>
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
								project={currentProjects[index]}
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
						Past Projects
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
							to="/past-projects"
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
