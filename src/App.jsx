import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import Home from "./routes/Home";
import Project from "./routes/Project";
import Projects from "./routes/Projects";
import Contact from "./routes/Contact";
import PastProjects from "./routes/PastWork";
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';

function App() {
	useEffect(() => {
		const handleBeforeInstallPrompt = (event) => {
			// Prevent the mini-infobar or prompt from showing
			event.preventDefault();
			console.log("Install prompt prevented");

			// Optionally, you can save the event for manual use later
			// window.deferredPrompt = event;
		};

		// Add an event listener for the beforeinstallprompt event
		window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

		// Cleanup the event listener on unmount
		return () => {
			window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
		};
	}, []);


	return (
		<div className="flex flex-col min-h-screen bg-gray-900">
			<NavigationBar />
			<main className="flex-grow mt-32">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/projects" element={<Projects />} />
					<Route path="/project/:title" element={<Project />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/past-projects" element={<PastProjects />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
}

export default App;
