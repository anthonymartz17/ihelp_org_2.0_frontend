import React from "react";
import startIcon from "../assets/icons/start_icon.svg";
import onMyWayIcon from "../assets/icons/onmyway_icon.svg";
import locationIcon from "../assets/icons/location_icon.svg";
import workingIcon from "../assets/icons/working_icon.svg";
import completeIcon from "../assets/icons/completed_icon.svg";
import { useState } from "react";
const taskProgressStates = [
	{
		id: 1,
		name: "Not Started",
		icon: startIcon,
	},
	{
		id: 2,
		name: "On the way",
		icon: onMyWayIcon,
	},
	{
		id: 3,
		name: "At location",
		icon: locationIcon,
	},
	{
		id: 4,
		name: "Task in progress",
		icon: workingIcon,
	},
	{
		id: 5,
		name: "Completed",
		icon: completeIcon,
	},
];

export default function TaskProgress({ taskProgressId }) {
	return (
		<div>
			<p className="subtitle-heading mb-4">Task Progress</p>
			<ol className="flex items-center w-full  mb-8">
				{taskProgressStates.map((state) => (
					<li
						className={`relative flex w-full items-center my-4    `}
						key={state.id}
					>
						<span
							className={`flex items-center z-20 justify-center w-10 h-10  rounded-full lg:h-12 lg:w-12 bg-secondary ${
								state.id > taskProgressId ? "bg-opacity-40" : ""
							} shrink-0 ${taskProgressId == state.id ? "active-step" : ""}`}
						>
							<img
								src={state.icon}
								alt={state.name}
								className={`w-9 ${
									state.id > taskProgressId ? "opacity-30" : ""
								}`}
							/>
						</span>
						{state.id < 5 && state.id < taskProgressId && (
							<span className={`absolute  h-1 w-full bg-secondary`}> </span>
						)}
						{state.id < 5 && (
							<span className="absolute bg-secondary bg-opacity-10 h-1 w-full">
								{" "}
							</span>
						)}
						<p className="body-text absolute bottom-[-20px] left-[-2px]">
							{state.name}
						</p>
					</li>
				))}
			</ol>
		</div>
	);
}
