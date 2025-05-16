import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../../src/assets/logo/white_bg_ihelp_logo.png";

export default function LoginPage() {
	const navigate = useNavigate();
	const { login, loading, error } = useAuth();

	const [email, setEmail] = useState("admin@dev.com");
	const [password, setPassword] = useState("qwerty12345");

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			await login(email, password);
			navigate("/dashboard");
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<div className="grid lg:grid-cols-[40%_60%] grid-cols-[100%] h-screen roboto-bold">
			<div className="text-dark px-[10%] lg:px-[20%]">
				<div className="flex justify-center md:justify-start">
					<img src={logo} alt="ihelp logo" className="w-[120px]" />
				</div>
				<div className=" h-[80%] py-[15%]">
					<h1 className="subtitle-heading mb-10 text-center">Sign In</h1>

					<form
						className="flex flex-col relative z-10 mb-4 "
						onSubmit={handleSubmit}
					>
						<div className="flex flex-col gap-1 mb-[5%]">
							<label htmlFor="email" className="body-text-bold">
								Email:
							</label>
							<input
								required
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="py-[5px] border px-2 border-greylight body-text rounded-[5px]"
							/>
						</div>
						<div className="flex flex-col gap-1 mb-[12%] body-text-bold">
							<label htmlFor="password">Password:</label>
							<input
								required
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="py-[5px] px-2 border border-greylight roboto-light rounded-[5px]"
							/>
						</div>
						<button className="text-white body-text-bold bg-secondary btn ">
							{loading ? (
								<svg
									className="animate-spin h-5 w-5"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
							) : (
								<span>Login</span>
							)}
						</button>
					</form>

					<p className="body-text cursor-pointer text-center">
						Forgot password
					</p>
				</div>
			</div>
			<div className="bg-primaryLighter text-white relative lg:block hidden">
				<div className="w-[100%] h-[85%] flex items-center justify-center">
					<div className="w-[40%] flex flex-col items-center justify-center relative z-10 text-center">
						<p className="title-heading roboto-medium">Turn your ideas</p>
						<p className="title-heading roboto-medium mb-[3%]">into reality</p>
						<p className="body-text roboto-light">
							Creating a stronger, more compassionate community
						</p>
					</div>
				</div>
				<div className="absolute bottom-0 w-[50%] h-[50%] overflow-hidden rounded-tr-[100%] rounded-bl-none rounded-br-none rounded-tl-none">
					<img
						src="https:shorturl.at/uL9TJ"
						alt="Volunteers helping out with donations"
						className="w-full h-full object-cover"
					/>
				</div>

				<div className="absolute top-5  right-2 grid grid-cols-[50%_50%] ">
					<div>
						<div className="hexagon"></div>
						<div className="hexagon mt-[-5px]"></div>
					</div>
					<div className="flex flex-col items-center justify-center">
						<div className="hexagon col-span-2 ml-[-20px]"></div>
					</div>
				</div>

				<div className="flex absolute top-0 w-[40%] h-[40%]">
					<div className="bg-primary w-[25%] h-[100%]"></div>
					<div className="bg-primary w-[25%] h-[75%]"></div>
					<div className="bg-primary w-[25%] h-[50%]"></div>
					<div className="bg-primary w-[25%] h-[25%]"></div>
				</div>

				<div className="flex absolute bottom-0 right-0 w-[40%] h-[40%] scale-[-1]">
					<div className="bg-primary w-[25%] h-[100%]"></div>
					<div className="bg-primary w-[25%] h-[75%]"></div>
					<div className="bg-primary w-[25%] h-[50%]"></div>
					<div className="bg-primary w-[25%] h-[25%]"></div>
				</div>
			</div>

			<style jsx="true">{`
				.hexagon {
					width: 120px;
					height: 120px;
					background-color: #1ea896;
					clip-path: polygon(
						25% 5%,
						75% 5%,
						100% 50%,
						75% 95%,
						25% 95%,
						0% 50%
					);
				}
			`}</style>
		</div>
	);
}
