import { useState, useEffect } from "react";

const useFirstVisit = () => {
	const [isFirstVisit, setIsFirstVisit] = useState(true);

	useEffect(() => {
		const hasVisited = localStorage.getItem("hasVisitedBefore");
		if (!hasVisited) {
			localStorage.setItem("hasVisitedBefore", "true");
		} else {
			setIsFirstVisit(false);
		}
	}, []);

	return isFirstVisit;
};

const getProgressBarColor = (percentage) => {
	if (percentage < 50) return "text-red-500";
	if (percentage < 80) return "text-orange-500";
	return "text-green-500";
};

function getTimeDifference(date) {
	const now = new Date();
	const then = new Date(date);
	const diffMonths =
		(now.getFullYear() - then.getFullYear()) * 12 +
		now.getMonth() -
		then.getMonth();

	if (diffMonths < 12) {
		return `${diffMonths} month${diffMonths !== 1 ? "s" : ""} ago`;
	} else {
		const years = Math.floor(diffMonths / 12);
		return `${years} year${years !== 1 ? "s" : ""} ago`;
	}
}

function formatDateRange(date) {
	if (!date) {
		return "Not started yet";
	} else if (typeof date === "string") {
		return getTimeDifference(date);
	} else if (date.to) {
		return getTimeDifference(date.to);
	} else {
		return `Started ${getTimeDifference(date.from)}`;
	}
}



export { useFirstVisit, getProgressBarColor, formatDateRange };