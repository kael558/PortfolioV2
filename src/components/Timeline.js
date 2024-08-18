import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import React from "react";
import { format, isWithinInterval, parseISO, isBefore } from "date-fns";

const Timeline = ({ children }) => {
  const items = children
    .split("\n")
    .filter((item) => item.trim().startsWith("-"));

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const isCurrentYear = date.getFullYear() === new Date().getFullYear();
    return format(date, isCurrentYear ? "MMMM d" : "MMMM d, yyyy");
  };

  const isCurrentDateInRange = (startDate, endDate) => {
    const today = new Date();
    const start = parseISO(startDate);
    const end = endDate ? parseISO(endDate) : start;
    return isWithinInterval(today, { start, end });
  };

  const findCurrentPhase = (items) => {
    const today = new Date();
    let currentPhase = null;
    let latestPastPhase = null;

    items.forEach((item) => {
      const [dateRange, ...contentParts] = item.substring(1).trim().split(":");
      const [startDate, endDate] = dateRange.split(" to ").map((date) => date.trim());
      
      if (isCurrentDateInRange(startDate, endDate)) {
        currentPhase = item;
      } else if (isBefore(parseISO(startDate), today)) {
        latestPastPhase = item;
      }
    });

    return currentPhase || latestPastPhase;
  };

  const currentPhase = findCurrentPhase(items);

  const renderContent = (content) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.slice(lastIndex, match.index));
      }
      parts.push(
        <a
          key={match.index}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300"
        >
          {match[1]}
        </a>
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push(content.slice(lastIndex));
    }

    return parts;
  };

  return (
    <VerticalTimeline>
      {items.map((item, index) => {
        const [dateRange, ...contentParts] = item.substring(1).trim().split(":");
        const itemContent = contentParts.join(":").trim();
        const [startDate, endDate] = dateRange.split(" to ").map((date) => date.trim());

        const formattedDateRange = endDate
          ? `${formatDate(startDate)} - ${formatDate(endDate)}`
          : formatDate(startDate);

        const highlight = item === currentPhase;

        return (
          <VerticalTimelineElement
            key={index}
            className={`vertical-timeline-element--work ${
              highlight ? "current-stage" : ""
            }`}
            date={formattedDateRange}
            iconStyle={{
              background: highlight ? "rgb(16, 185, 129)" : "rgb(139, 92, 246)",
              color: "#fff",
            }}
            contentStyle={{
              background: highlight ? "#065F46" : "#1F2937",
              color: highlight ? "#E6FFFA" : "#D1D5DB",
            }}
            contentArrowStyle={{
              borderRight: `7px solid ${highlight ? "#065F46" : "#1F2937"}`,
            }}
          >
            <h3 className="text-xl font-semibold text-purple-300 mb-1">
              {renderContent(itemContent)}
            </h3>
            <p className="text-gray-300">{formattedDateRange}</p>
          </VerticalTimelineElement>
        );
      })}
    </VerticalTimeline>
  );
};

export default Timeline;