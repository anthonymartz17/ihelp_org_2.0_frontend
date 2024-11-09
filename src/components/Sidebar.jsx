import { Link } from "react-router-dom";
import { menuItems } from "./menuItems";
import OrganizationLogo from "../assets/graphics/solidarity_org_logo.svg";
export default function sidebar() {
	return (
		<div>
			<div className="flex pl-8 items-center  pt-4 ">
				<img
					src={OrganizationLogo}
					alt=""
					className=" w-[50px] h-[50px] bg-white rounded-full"
				/>
			</div>

			<ul className="py-[3em]">
				{menuItems.map((item) => (
					<li key={item.title} className="hover:bg-primaryLighter">
						<Link to={item.link} className="flex items-center gap-3 p-4">
							<span className="material-symbols-outlined text-xl">
								{item.icon}
							</span>
							{item.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
