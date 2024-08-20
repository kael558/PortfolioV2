import React from "react";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gray-800 text-gray-300 py-4 mt-12">
			<p className="text-sm text-center">
				© {currentYear} Rahel Gunaratne. All rights reserved.
			</p>
		</footer>
	);
};

export default Footer;
