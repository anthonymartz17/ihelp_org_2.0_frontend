import { Link } from "react-router-dom";
import { menuItems } from "./menuItems";

export default function sidebar() {
	return (
		<div>
			<div className="bg-red-600 h-[4em] flex items-center pl-8">
				<h1>Logo</h1>
			</div>

			<ul>
				{menuItems.map((item) => (
					<li key={item.title}>
						<Link to={item.link} className="flex items-center gap-1 p-4">
							<span className="material-symbols-outlined">{item.icon}</span>
							{item.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
