import React, { useEffect } from "react";

import { useRequestsContext } from "../../context/RequestContext";
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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
	const { currentUser } = useAuth();
	const { getRequests } = useRequestsContext();
	useEffect(() => {
		if (currentUser?.accessToken) {
			getRequests(currentUser.accessToken);
		}
	}, [currentUser?.accessToken]);

	return (
		<div className="flex flex-col gap-4  px-6">
			<h1 className="subtitle-heading  text-dark">Requests</h1>

			<div>
				<ul className="flex flex-wrap mb-6  lable-text text-center text-dark border-b">
					{tabs.map((tab, idx) => (
						<li className="me-2" key={idx}>
							<NavLink
								to={tab.link}
								end
								className={({ isActive }) =>
									`inline-block p-4 rounded-t-lg hover:text-gray-600 border-t border-l border-r body-text ${
										isActive
											? "text-dark body-text-bold border-dark border-opacity-25 "
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
