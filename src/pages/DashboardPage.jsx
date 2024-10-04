import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/sidebar";
export default function DashboardPage() {
	return (
		<div className="flex h-screen">
			<aside className="w-1/6 bg-green-300">
				<Sidebar />
			</aside>

			<div className="flex flex-col  h-full w-full">
				<Header className="bg-green-300" />

				<main className="bg-slate-500 flex-grow">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
