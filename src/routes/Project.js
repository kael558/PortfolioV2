import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import ProjectData from "../ProjectData";
import Timeline from "../components/Timeline";
import rehypeRaw from "rehype-raw";
import AudioPlayer from '../components/AudioPlayer';
import People from '../components/People';

const MarkdownComponents = {
	h1: ({ children }) => (
		<h1 className="text-4xl font-bold mb-6 text-purple-300 border-b-2 border-purple-500 pb-2 tracking-widest">
			{children}
		</h1>
	),
	h2: ({ children }) => (
		<h2 className="text-3xl font-semibold mt-12 mb-4 text-pink-400 tracking-wider">{children}</h2>
	),
	h3: ({ children }) => (
		<h3 className="text-2xl font-semibold mb-3 text-purple-300">{children}</h3>
	),
	p: ({ children }) => (
		<p className="text-gray-300 leading-relaxed mb-4 tracking-wide">{children}</p>
	),
	ul: ({ children }) => (
		<ul className="list-disc list-inside mb-4 text-gray-300">{children}</ul>
	),
	ol: ({ children }) => (
		<ol className="list-decimal list-inside mb-4 text-gray-300">{children}</ol>
	),
	li: ({ children }) => <li className="mb-2">{children}</li>,
	a: ({ href, children }) => (
		<a
			href={href}
			className="text-pink-400 hover:text-pink-300 transition-colors duration-300"
		>
			{children}
		</a>
	),
	code: ({ children }) => (
		<code className="bg-gray-800 text-pink-300 px-2 py-1 rounded">
			{children}
		</code>
	),
	pre: ({ children }) => (
		<pre className="bg-gray-800 text-gray-300 p-4 rounded-lg overflow-x-auto mb-4">
			{children}
		</pre>
	),
	timeline: Timeline,
	audio: AudioPlayer,
	people: People,
	video: ({ src, controls = true }) => (
		<video src={src} controls={controls} className="w-full rounded-lg mb-4">
		  Your browser does not support the video tag.
		</video>
	  ),
};

const Project = () => {
	const { title } = useParams();
	const [markdownContent, setMarkdownContent] = useState("");
	const projectData = ProjectData.find(
		(project) => project.title.toLowerCase().replace(/\s+/g, "-") === title
	);

	useEffect(() => {
		if (projectData && projectData.folder) {
			const baseUrl = `${process.env.PUBLIC_URL}/projects/${projectData.folder}`;
			const contentUrl = `${baseUrl}/content.md`;

			fetch(contentUrl)
				.then((response) => response.text())
				.then((text) => {
					// Replace image paths in the Markdown content
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
				.catch((error) =>
					console.error("Error fetching Markdown file:", error)
				);
		}
	}, [projectData]);

	if (!projectData) {
		return <div>Project not found</div>;
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-100 py-6 px-4 sm:px-6 lg:px-8">
			<div className="max-w-4xl mx-auto">
				<div className="fixed top-4 left-4 z-10">
					<Link
						to="/"
						className="flex items-center text-pink-400 hover:text-pink-300 transition-colors duration-300 bg-gray-900 bg-opacity-75 rounded-full py-2 px-4"
					>
						<FaArrowLeft className="mr-2" /> Back to Home
					</Link>
				</div>

				<div className="markdown-content mb-16 pt-16">
					<ReactMarkdown
						components={MarkdownComponents}
						rehypePlugins={[rehypeRaw]}
					>
						{markdownContent}
					</ReactMarkdown>
				</div>
			</div>
		</div>
	);
};

export default Project;
