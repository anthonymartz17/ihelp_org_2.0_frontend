import { Link } from "react-router-dom";
import { menuItems } from "./menuItems";

export default function sidebar() {
	return (
		<div>
			<div className="h-[4em] flex items-center pl-8">
				<h1>Logo</h1>
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
