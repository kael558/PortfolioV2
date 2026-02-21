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
		<h1 className="text-3xl md:text-4xl font-bold mt-8 mb-6 text-gray-100 leading-tight">
			{children}
		</h1>
	),
	h2: ({ children }) => (
		<h2 className="text-2xl md:text-3xl font-semibold mt-14 mb-5 text-gray-100 leading-snug">
			{children}
		</h2>
	),
	h3: ({ children }) => (
		<h3 className="text-xl md:text-2xl font-semibold mt-8 mb-3 text-gray-200">
			{children}
		</h3>
	),
	p: ({ children }) => (
		<p className="text-gray-300 leading-[1.8] mb-5 text-[16px] md:text-[17px]">
			{children}
		</p>
	),
	ul: ({ children }) => (
		<ul className="list-disc pl-6 mb-5 text-gray-300 space-y-2 leading-[1.8]">
			{children}
		</ul>
	),
	ol: ({ children }) => (
		<ol className="list-decimal pl-6 mb-5 text-gray-300 space-y-2 leading-[1.8]">
			{children}
		</ol>
	),
	li: ({ children }) => <li className="pl-1">{children}</li>,
	a: ({ href, children }) => (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="text-purple-400 hover:text-purple-300 underline decoration-purple-400/40 underline-offset-2 transition-colors duration-200"
		>
			{children}
		</a>
	),
	strong: ({ children }) => (
		<strong className="text-gray-100 font-semibold">{children}</strong>
	),
	em: ({ children }) => (
		<em className="text-gray-200 italic">{children}</em>
	),
	blockquote: ({ children }) => (
		<blockquote className="border-l-4 border-purple-500/60 pl-5 my-6 text-gray-400 italic">
			{children}
		</blockquote>
	),
	hr: () => (
		<hr className="border-gray-700/50 my-10" />
	),
	code: ({ children }) => (
		<code className="bg-gray-800 text-purple-300 px-1.5 py-0.5 rounded text-sm font-mono">
			{children}
		</code>
	),
	pre: ({ children }) => (
		<pre className="bg-gray-800 text-gray-300 p-5 rounded-lg overflow-x-auto mb-5 text-sm font-mono leading-relaxed">
			{children}
		</pre>
	),
	img: ({ src, alt }) => (
		<figure className="my-8">
			<img
				src={src}
				alt={alt}
				className="w-full rounded-lg"
			/>
			{alt && (
				<figcaption className="text-center text-sm text-gray-500 mt-3 italic">
					{alt}
				</figcaption>
			)}
		</figure>
	),
	timeline: Timeline,
	audio: AudioPlayer,
	people: People,
	video: ({ src, controls = true }) => (
		<div className="my-8">
			<video
				src={src}
				controls={controls}
				className="w-full rounded-lg"
			>
				Your browser does not support the video tag.
			</video>
		</div>
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
						className="text-purple-400 hover:text-purple-300 transition-colors"
					>
						&larr; Back to Home
					</button>
				</div>
			</div>
		);
	}

	const hasMarkdownContent = markdownContent.trim().length > 0;
	const hasLinks = projectData.link || projectData.video || projectData.github;

	return (
		<div className="min-h-screen bg-gray-900 text-gray-100">
			{/* Back button */}
			<div className="fixed top-20 md:top-4 left-4 md:left-6 z-50">
				<button
					className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-gray-800/95 backdrop-blur-sm text-gray-300 hover:text-white transition-all duration-200 text-sm shadow-md border border-gray-700/60"
					onClick={back}
				>
					<FaArrowLeft className="text-xs" /> Back
				</button>
			</div>

			{/* Article */}
			<article className="max-w-3xl mx-auto px-5 sm:px-8 pt-24 md:pt-28 pb-24">
				{/* Header area */}
				<header className="mb-10">
					{/* Tags */}
					{projectData.tags && projectData.tags.length > 0 && (
						<div className="flex flex-wrap items-center gap-2 mb-5">
							{projectData.tags.map((tag, i) => (
								<span
									key={i}
									className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getTagColor(tag)}`}
								>
									{tag}
								</span>
							))}
							{projectData.placement && (
								<span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-500/90 text-gray-900">
									{projectData.placement}
								</span>
							)}
						</div>
					)}

					{/* Title */}
					<h1 className="text-4xl md:text-5xl font-bold text-gray-50 leading-tight mb-4">
						{projectData.title}
					</h1>

					{/* Description */}
					<p className="text-lg text-gray-400 leading-relaxed mb-5">
						{projectData.description}
					</p>

					{/* Date */}
					{projectData.date && (
						<p className="text-sm text-gray-500 mb-6">
							{formatDateRange(projectData.date)}
						</p>
					)}

					{/* Links */}
					{hasLinks && (
						<div className="flex flex-wrap items-center gap-3 pb-2">
							{projectData.link && (
								<a
									href={projectData.link}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300 transition-colors"
								>
									<FaExternalLinkAlt className="text-xs" /> Visit Project
								</a>
							)}
							{projectData.video && (
								<a
									href={projectData.video}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300 transition-colors"
								>
									<FaExternalLinkAlt className="text-xs" /> Watch Video
								</a>
							)}
							{projectData.github && (
								<a
									href={projectData.github}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-300 transition-colors"
								>
									<FaGithub /> Source Code
								</a>
							)}
						</div>
					)}

					{/* Divider */}
					<hr className="border-gray-800 mt-6" />
				</header>

				{/* Markdown body */}
				{contentLoaded && (
					<>
						{hasMarkdownContent ? (
							<div className="article-body">
								<ReactMarkdown
									components={MarkdownComponents}
									rehypePlugins={[rehypeRaw]}
								>
									{markdownContent}
								</ReactMarkdown>
							</div>
						) : (
							<p className="text-gray-500 italic py-8">
								Detailed write-up coming soon. Check out the links above to learn more.
							</p>
						)}
					</>
				)}
			</article>
		</div>
	);
};

export default Project;
