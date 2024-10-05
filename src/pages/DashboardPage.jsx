import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/sidebar";
export default function DashboardPage() {
	return (
		<div className="flex h-screen bg-grayLight ">
			<aside className="w-1/6 bg-white shadow-custom">
				<Sidebar />
			</aside>

			<div className="flex flex-col  h-full w-full">
				<Header />

				<main>
					<Outlet />
				</main>
			</div>
		</div>
	);
}
