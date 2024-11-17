import { Link, useNavigate } from "react-router-dom";
import profileIcon from "../assets/icons/profile.svg";
import settingsIcon from "../assets/icons/settings.svg";
import logoutIcon from "../assets/icons/logout.svg";
import { useAuth } from "../context/AuthContext";

const links = [
	{
		link: "Profile",
		route: "/profile",
		icon: profileIcon,
	},
	{
		link: "Account Settings",
		route: "/settings",
		icon: settingsIcon,
	},
];

const user = {
	name: "Eshli Martinez",
	email: "eshlimartinez@gmail.com",
};

export default function Header() {
	const navigate = useNavigate();
	const { logout } = useAuth();
	function signout() {
		logout();
		navigate("/login");
	}
	return (
		<div className="flex items-center justify-end pt-4 pr-8 ">
			<div className="flex items-baseline gap-4">
				<span className="material-symbols-outlined text-xl">notifications</span>
				<div className="relative text-dark group">
					<img
						className="rounded w-8 h-8 object-cover"
						src="https://media.istockphoto.com/id/1338134319/photo/portrait-of-young-indian-businesswoman-or-school-teacher-pose-indoors.jpg?s=612x612&w=0&k=20&c=Dw1nKFtnU_Bfm2I3OPQxBmSKe9NtSzux6bHqa9lVZ7A="
						alt="image description"
					/>
					<div className="min-w-[20em] hidden group-hover:block absolute top-8 p-2 right-[-10px] bg-white  card-shadow body-text text-sm w-[15em] ">
						<div className="flex gap-2 border-b-[1px] border-greylight mb-2 pb-3">
							<img
								className="rounded w-10 object-cover"
								src="https://media.istockphoto.com/id/1338134319/photo/portrait-of-young-indian-businesswoman-or-school-teacher-pose-indoors.jpg?s=612x612&w=0&k=20&c=Dw1nKFtnU_Bfm2I3OPQxBmSKe9NtSzux6bHqa9lVZ7A="
								alt="image description"
							/>
							<div>
								<p className="body-text-bold">{user.name}</p>
								<p className="body-text-small">{user.email}</p>
							</div>
						</div>
						<ul className=" border-b-[1px] border-greylight  mb-2 pb-1 body-text">
							{links.map((link, idx) => (
								<li key={idx}>
									<Link
										to={link.route}
										className="flex gap-2 mb-1 p-1  hover:label-text hover:bg-greylight rounded-md "
									>
										<img src={link.icon} alt="" className="w-3" />
										<span>{link.link}</span>
									</Link>
								</li>
							))}
						</ul>
						<div>
							<div>
								<button
									onClick={() => signout()}
									className="flex gap-2 px-2 mb-1 p-1 body-text-small  hover:bg-greylight rounded-md flexx items-center w-full"
								>
									<img src={logoutIcon} alt="" className="w-3" />
									<span className="body-text">Logout</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
