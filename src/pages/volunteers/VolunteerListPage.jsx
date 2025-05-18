import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useAuth } from "../../context/AuthContext";
import { useVolunteerContext } from "../../context/VolunteerContext";
export default function VolunteerListPage() {
	const { currentUser } = useAuth();
	const { getVolunteers, volunteers, isLoading, error } = useVolunteerContext();
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);
	const [itemToDelete, setItemToDelete] = useState(null);

	useEffect(() => {
		if (!currentUser?.accessToken) return;

		getVolunteers(currentUser.accessToken);
	}, [currentUser?.accessToken]);

	return (
		<div className="flex flex-col gap-4 py-[2em] px-6">
			<h1 className="roboto-bold text-xl text-dark">Volunteers</h1>
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
							onClick={() => navigate("/dashboard/volunteers/new")}
							type="button"
							className=" h-full w-56 text-white bg-secondary hover:bg-secondaryLighter focus:ring-4 focus:outline-none  text-l rounded-lg py-2.5 flex justify-center items-center"
						>
							+ New Volunteer
						</button>
					</div>
				</div>
				<div className="relative overflow-y-auto max-h-[70vh] shadow-md sm:rounded-lg mt-4">
					<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray">
						<thead className="text-gray-700 bg-gray-50  dark:bg-dark dark:text-gray-400 sticky top-0">
							<tr className="text-white">
								<th scope="col" className="px-6 py-3">
									ID
								</th>
								<th scope="col" className="px-6 py-3">
									Name
								</th>
								<th scope="col" className="px-6 py-3">
									Email
								</th>
								<th scope="col" className="px-6 py-3">
									Age
								</th>
								<th scope="col" className="px-6 py-3">
									Pointed Earned
								</th>
								<th scope="col" className="px-6 py-3">
									Status
								</th>
								<th scope="col" className="px-12 py-3 ">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{isLoading ? (
								<tr>
									<td colSpan="6" className="text-center py-4">
										Loading...
									</td>
								</tr>
							) : error ? (
								<tr>
									<td colSpan="6" className="text-center text-red-500 py-4">
										{error.message}
									</td>
								</tr>
							) : volunteers.length === 0 ? (
								<tr>
									<td colSpan="6" className="text-center py-4">
										No requesters found.
									</td>
								</tr>
							) : (
								volunteers.map((volunteer) => (
									<tr
										key={volunteer.id}
										className="odd:dark:bg-transparent even:bg-purpleLighter even:dark:bg-purpleLightest border-b dark:border-gray-200"
									>
										<td className="px-6 py-4">{volunteer.id}</td>
										<td className="px-6 py-4">{volunteer.name}</td>
										<td className="px-6 py-4">{volunteer.email}</td>
										<td className="px-6 py-4">{volunteer.age}</td>
										<td className="px-6 py-4">{volunteer.points_earned}</td>
										<td className="px-6 py-4">
											{volunteer.is_active ? "Active" : "Inactive"}
										</td>
										<td className="px-6 py-4 flex gap-4">
											<Link to={`/dashboard/volunteers/${volunteer.id}`}>
												<span className="material-symbols-outlined cursor-pointer hover:text-primaryLighter ">
													visibility
												</span>
											</Link>
											<Link to={`/dashboard/volunteers/${volunteer.id}/edit`}>
												<span className="material-symbols-outlined cursor-pointer hover:text-yellow-600 ">
													edit
												</span>
											</Link>
											<span
												onClick={() => {
													setShowModal(true);
													setItemToDelete(volunteer.id);
												}}
												className="material-symbols-outlined cursor-pointer hover:text-red-500 "
											>
												delete
											</span>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
				{showModal && (
					<ConfirmationModal
						message={"Are you sure you want to delete this request?"}
						onCancel={() => setShowModal(false)}
					/>
				)}
			</div>
		</div>
	);
}
