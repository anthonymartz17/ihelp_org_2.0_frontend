import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useRewardsContext } from "../../context/RewardsContext";
import { useAuth } from "../../context/AuthContext";

export default function RewardListPage() {
	const navigate = useNavigate();
	const { getRewards, rewards, isLoading, err } = useRewardsContext();
	const { currentUser } = useAuth();

	const [showModal, setShowModal] = useState(false);
	const [itemToDelete, setItemToDelete] = useState(null);

	useEffect(() => {
		getRewards(currentUser?.accessToken);
	}, [currentUser?.accessToken]);

	const confirmDelete = async () => {
		try {
			await fetch(`${import.meta.env.VITE_API_URL}/rewards/${itemToDelete}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			setRewards(rewards.filter((reward) => reward.id !== itemToDelete));
		} catch (error) {
			console.error("Failed to delete reward:", error);
		} finally {
			setShowModal(false);
			setItemToDelete(null);
		}
	};

	return (
		<div className="flex flex-col gap-4 py-[2em] px-6">
			<h1 className="roboto-bold text-xl text-dark">Rewards</h1>
			<div>
				<div className="flex gap-2 justify-between items-center  w-full">
					<form className="w-[25em]">
						<label
							htmlFor="default-search"
							className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
						>
							Search
						</label>
						<div className="relative">
							<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
								<span className="material-symbols-outlined text-dark opacity-40">
									search
								</span>
							</div>
							<input
								type="search"
								id="default-search"
								className="block w-full p-2 ps-10 text-sm text-gray-700 border border-gray-300 rounded-lg focus:ring-gray-300 focus:border-gray-500"
								placeholder="Search..."
								required
							/>
						</div>
					</form>
					<div>
						<button
							onClick={() => navigate("/dashboard/rewards/new")}
							type="button"
							className=" h-full w-56 text-white bg-secondary hover:bg-secondaryLighter focus:ring-4 focus:outline-none  text-l rounded-lg py-2.5 flex justify-center items-center"
						>
							+ New Reward
						</button>
					</div>
				</div>
				<div className="relative overflow-y-auto max-h-[70vh] shadow-md sm:rounded-lg mt-4">
					<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray ">
						<thead className="text-gray-700 bg-gray-50  dark:bg-dark dark:text-gray-400 sticky top-0">
							<tr className="text-white">
								<th scope="col" className="px-6 py-3">
									ID
								</th>
								<th scope="col" className="px-6 py-3">
									Name
								</th>
								<th scope="col" className="px-6 py-3">
									Description
								</th>
								<th scope="col" className="px-6 py-3">
									Points Required
								</th>
								<th scope="col" className="px-12 py-3 ">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{rewards.map((reward) => (
								<tr
									key={reward.id}
									className="odd:dark:bg-transparent even:bg-purpleLighter even:dark:bg-purpleLightest border-b dark:border-gray-200"
								>
									<td className="px-6 py-4">{reward.id}</td>
									<td className="px-6 py-4">{reward.name}</td>
									<td className="px-6 py-4">{reward.description}</td>
									<td className="px-6 py-4">{reward.points_required}</td>
									<td className="px-6 py-4 flex gap-4">
										<Link to={`/dashboard/rewards/${reward.id}`}>
											<span className="material-symbols-outlined cursor-pointer hover:text-primaryLighter ">
												visibility
											</span>
										</Link>
										<Link to={`/dashboard/rewards/${reward.id}/edit`}>
											<span className="material-symbols-outlined cursor-pointer hover:text-yellow-600 ">
												edit
											</span>
										</Link>
										<span
											onClick={() => {
												setShowModal(true);
												setItemToDelete(reward.id);
											}}
											className="material-symbols-outlined cursor-pointer hover:text-red-500 "
										>
											Delete
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				{showModal && (
					<ConfirmationModal
						message={"Are you sure you want to delete this request?"}
						onCancel={() => setShowModal(false)}
						onConfirm={confirmDelete}
					/>
				)}
			</div>
		</div>
	);
}
