import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./routes/Home";
import Project from "./routes/Project";
import Projects from "./routes/Projects";
import Contact from "./routes/Contact";
import PastProjects from "./routes/PastWork";
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';

function App() {
	return (
	  <div className="flex flex-col min-h-screen bg-gray-900">
		<NavigationBar />
		<main className="flex-grow">
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
