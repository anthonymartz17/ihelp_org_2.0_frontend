import React, { useEffect } from "react";

import { useRequestsContext } from "../../context/RequestContextProvider";
import { Outlet, NavLink } from "react-router-dom";

const tabs = [
	{
		name: "Open",
		link: "/dashboard/requests/open",
	},
	{
		name: "Assigned",
		link: "/dashboard/requests/assigned",
	},
	{
		name: "In progress",
		link: "/dashboard/requests/in-progress",
	},
	{
		name: "Completed",
		link: "/dashboard/requests/completed",
	},
];
export default function RequestsList() {
	useRequestsContext();

	return (
		<div className="flex flex-col gap-4 pt-[2em] px-6">
			<h1 className="roboto-bold text-xl text-dark">Requests</h1>

			<div>
				<ul className="flex flex-wrap mb-6  lable-text text-center text-dark border-b">
					{tabs.map((tab, idx) => (
						<li className="me-2" key={idx}>
							<NavLink
								to={tab.link}
								end
								className={({ isActive }) =>
									`inline-block p-4 rounded-t-lg hover:text-gray-600 border-t border-l border-r ${
										isActive
											? "text-dark label-text border-dark border-opacity-25 "
											: "border-transparent hover:border-dark hover:border-opacity-25"
									}`
								}
							>
								{tab.name}
							</NavLink>
						</li>
					))}
				</ul>

				<Outlet />
			</div>
		</div>
	);
}
