import { NavLink } from "react-router-dom";
import { menuItems } from "./menuItems";
import OrganizationLogo from "../assets/graphics/solidarity_org_logo.svg";

export default function Sidebar() {
	return (
		<div>
			<div className="flex pl-8 items-center pt-4">
				<img
					src={OrganizationLogo}
					alt="Organization Logo"
					className="w-[50px] h-[50px] bg-white rounded-full"
				/>
			</div>

			<ul className="py-[3em]">
				{menuItems.map((item) => (
					<li key={item.title} className="hover:bg-primaryLighter">
						<NavLink
							to={item.link}
							className={({ isActive }) =>
								`flex items-center gap-3 p-4 body-text mb-1 ${
									isActive
										? "bg-primaryLighter text-lightest body-text-bold"
										: ""
								}`
							}
						>
							<span className="material-symbols-outlined text-xl">
								{item.icon}
							</span>
							{item.title}
						</NavLink>
					</li>
				))}
			</ul>
		</div>
	);
}
