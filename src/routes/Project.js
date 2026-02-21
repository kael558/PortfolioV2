import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import ProjectData from "../ProjectData";
import Timeline from "../components/Timeline";
import rehypeRaw from "rehype-raw";
import AudioPlayer from "../components/AudioPlayer";
import People from "../components/People";
import { formatDateRange, getTagColor } from "../Utils";

const MarkdownComponents = {
	h1: ({ children }) => (
		<h1 className="text-3xl md:text-4xl font-bold mb-6 text-purple-300 border-b-2 border-purple-500/50 pb-3 tracking-wide">
			{children}
		</h1>
	),
	h2: ({ children }) => (
		<h2 className="text-2xl md:text-3xl font-semibold mt-12 mb-4 text-pink-400 tracking-wide">
			{children}
		</h2>
	),
	h3: ({ children }) => (
		<h3 className="text-xl md:text-2xl font-semibold mb-3 text-purple-300">
			{children}
		</h3>
	),
	p: ({ children }) => (
		<p className="text-gray-300 leading-relaxed mb-4 tracking-wide">
			{children}
		</p>
	),
	ul: ({ children }) => (
		<ul className="list-disc list-inside mb-4 text-gray-300 space-y-1">
			{children}
		</ul>
	),
	ol: ({ children }) => (
		<ol className="list-decimal list-inside mb-4 text-gray-300 space-y-1">
			{children}
		</ol>
	),
	li: ({ children }) => <li className="mb-1">{children}</li>,
	a: ({ href, children }) => (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="text-pink-400 hover:text-pink-300 underline underline-offset-2 transition-colors duration-300"
		>
			{children}
		</a>
	),
	code: ({ children }) => (
		<code className="bg-gray-800/80 text-pink-300 px-2 py-1 rounded text-sm">
			{children}
		</code>
	),
	pre: ({ children }) => (
		<pre className="bg-gray-800/80 text-gray-300 p-4 rounded-xl overflow-x-auto mb-4 border border-gray-700/50">
			{children}
		</pre>
	),
	timeline: Timeline,
	audio: AudioPlayer,
	people: People,
	video: ({ src, controls = true }) => (
		<video
			src={src}
			controls={controls}
			className="w-full rounded-xl mb-4 border border-gray-700/50 shadow-lg"
		>
			Your browser does not support the video tag.
		</video>
	),
};

const Project = () => {
	const { title } = useParams();
	const [markdownContent, setMarkdownContent] = useState("");
	const [contentLoaded, setContentLoaded] = useState(false);
	const projectData = ProjectData.find(
		(project) => project.title.toLowerCase().replace(/\s+/g, "-") === title
	);
	const navigate = useNavigate();

	const back = () => {
		if (window.history.length > 1) {
			navigate(-1);
		} else {
			navigate("/", { replace: true });
		}
	};

	useEffect(() => {
		if (projectData && projectData.folder) {
			const baseUrl = `${process.env.PUBLIC_URL}/projects/${projectData.folder}`;
			const contentUrl = `${baseUrl}/content.md`;

			fetch(contentUrl)
				.then((response) => {
					setContentLoaded(true);
					return response.text();
				})
				.then((text) => {
					const updatedText = text.replace(
						/!\[(.*?)\]\((.*?)\)/g,
						(match, alt, src) => {
							if (!src.startsWith("http") && !src.startsWith("/")) {
								return `![${alt}](${baseUrl}/${src})`;
							}
							return match;
						}
					);
					setMarkdownContent(updatedText);
				})
				.catch(() => {
					setContentLoaded(true);
					setMarkdownContent("");
				});

			window.scrollTo(0, 0);
		} else {
			setContentLoaded(true);
		}
	}, [projectData]);

	if (!projectData) {
		return (
			<div className="min-h-screen bg-gray-900 flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-gray-400 mb-4">
						Project not found
					</h1>
					<button
						onClick={() => navigate("/")}
						className="text-pink-400 hover:text-pink-300 transition-colors"
					>
						← Back to Home
					</button>
				</div>
			</div>
		);
	}

	const hasMarkdownContent = markdownContent.trim().length > 0;

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-100">
			{/* Back button - fixed */}
			<div className="fixed top-20 md:top-4 left-4 md:left-6 z-50">
				<button
					className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 text-pink-400 hover:text-pink-300 hover:bg-gray-700/90 transition-all duration-300 shadow-lg"
					onClick={back}
				>
					<FaArrowLeft className="text-sm" /> Back
				</button>
			</div>

			{/* Hero section */}
			<div className="relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20" />
				<div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-12">
					<h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-400 to-purple-300 mb-4 tracking-tight">
						{projectData.title}
					</h1>
					<p className="text-lg md:text-xl text-gray-400 mb-6 max-w-2xl leading-relaxed">
						{projectData.description}
					</p>

					{/* Meta row */}
					<div className="flex flex-wrap items-center gap-3 mb-6">
						{projectData.date && (
							<span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-800/80 text-gray-300 border border-gray-700/50">
								{formatDateRange(projectData.date)}
							</span>
						)}
						{projectData.tags?.map((tag, i) => (
							<span
								key={i}
								className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTagColor(
									tag
								)}`}
							>
								{tag}
							</span>
						))}
						{projectData.placement && (
							<span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gradient-to-r from-yellow-500/80 to-amber-600/80 text-white font-semibold">
								{projectData.placement}
							</span>
						)}
					</div>

					{/* External links */}
					{(projectData.link || projectData.video) && (
						<div className="flex flex-wrap gap-3">
							{projectData.link && (
								<a
									href={projectData.link}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-pink-500/20 text-pink-400 hover:bg-pink-500/30 border border-pink-500/30 transition-colors"
								>
									<FaExternalLinkAlt /> Visit Project
								</a>
							)}
							{projectData.video && (
								<a
									href={projectData.video}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border border-purple-500/30 transition-colors"
								>
									Watch Video
								</a>
							)}
							{projectData.github && (
								<a
									href={projectData.github}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 border border-gray-600 transition-colors"
								>
									<FaGithub /> Source Code
								</a>
							)}
						</div>
					)}
				</div>
			</div>

			{/* Content area */}
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
				{contentLoaded && (
					<>
						{hasMarkdownContent ? (
							<div className="prose-content rounded-2xl p-6 md:p-8 bg-gray-900/50 border border-gray-800/50 shadow-xl">
								<ReactMarkdown
									components={MarkdownComponents}
									rehypePlugins={[rehypeRaw]}
								>
									{markdownContent}
								</ReactMarkdown>
							</div>
						) : (
							<div className="rounded-2xl p-6 md:p-8 bg-gray-900/50 border border-gray-800/50">
								<p className="text-gray-400 italic">
									Detailed project documentation coming soon. In the meantime,
									check out the links above to learn more.
								</p>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default Project;
