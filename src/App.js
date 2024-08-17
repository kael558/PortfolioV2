import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./routes/Home";
import Project from "./routes/Project";

function App() {

	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/home" element={<Home />} />
				<Route path="/project/:title" element={<Project />} />
			</Routes>
		</>
	);
}

export default App;
