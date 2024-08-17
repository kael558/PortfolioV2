import {
    VerticalTimeline,
    VerticalTimelineElement,
  } from "react-vertical-timeline-component";
  import "react-vertical-timeline-component/style.min.css";
  import React from "react";
  
  const Timeline = ({ children }) => {
    const items = children.split("\n").filter((item) => item.trim().startsWith("-"));
  
    return (
      <VerticalTimeline>
        {items.map((item, index) => {
          const [date, ...contentParts] = item.substring(1).trim().split(":");
          const itemContent = contentParts.join(":").trim();
  
          return (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work"
              date={date.trim()}
              iconStyle={{ background: "rgb(139, 92, 246)", color: "#fff" }} // Purple background, white icon
              contentStyle={{ background: "#1F2937", color: "#D1D5DB" }} // Dark background, light text
              contentArrowStyle={{ borderRight: "7px solid #1F2937" }} // Arrow color matching the background
            >
              <h3 className="text-xl font-semibold text-purple-300 mb-1">{itemContent}</h3>
              <p className="text-gray-300">{date.trim()}</p>
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    );
  };
  
  export default Timeline;
  