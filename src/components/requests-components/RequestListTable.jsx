import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "../ConfirmationModal";

import { useRequestsContext } from "../../context/RequestContext";
export default function RequestListTable() {
	const { request } = useRequestsContext();
	const navigate = useNavigate();
	// const [requests, setRequests] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [itemToDelete, setItemToDelete] = useState(null);

	useEffect(() => {
		// fetchRequests();
	}, []);

	const confirmDelete = async () => {
		try {
			await fetch(`${import.meta.env.VITE_API_URL}/requests/${itemToDelete}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			setRequests(requests.filter((request) => request.id !== itemToDelete));
		} catch (error) {
			console.error("Failed to delete request:", error);
		} finally {
			setShowModal(false);
			setItemToDelete(null);
		}
	};

	return (
		<div>
			<div className="flex justify-between items-center mb-2">
				<div className="flex gap-2 justify-between items-center  w-full">
					<form className="w-[25em]">
						<label
							htmlFor="default-search"
							className="mb-2 body-text text-gray-900  dark:text-white"
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
							className=" h-full w-56 text-white bg-secondary hover:bg-secondaryLighter "
						>
							+ New Request
						</button>
					</div>
				</div>
			</div>
			<div className="relative overflow-y-auto max-h-[60vh] sm:rounded-lg mt-4">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray ">
					<thead className="text-gray-700 bg-gray-50  dark:bg-dark dark:text-gray-400 sticky top-0">
						<tr className="text-white">
							<th scope="col" className="px-6 py-3">
								ID
							</th>
							<th scope="col" className="px-6 py-3">
								Requester
							</th>

							<th scope="col" className="px-6 py-3">
								Category
							</th>
							<th scope="col" className="px-6 py-3">
								Committed Tasks
							</th>
							<th scope="col" className="px-6 py-3">
								Status
							</th>
							<th scope="col" className="px-6 py-3">
								Created At
							</th>
							<th scope="col" className="px-12 py-3 ">
								Action
							</th>
						</tr>
					</thead>

					<tbody>
						{requests.map((request) => (
							<tr
								key={request.id}
								className="odd:dark:bg-transparent even:bg-purpleLighter even:dark:bg-purpleLightest border-b dark:border-gray-200"
							>
								<td className="px-6 py-4">{request.id}</td>
								<td className="px-6 py-4">
									{request.requester_first_name} {request.requester_last_name}
								</td>
								<td className="px-6 py-4">{request.category_name}</td>
								<td className="px-6 py-4">
									{request.assigned_tasks}/{request.total_tasks}
								</td>
								<td className="px-6 py-4">{request.status_name}</td>
								<td className="px-6 py-4">
									{new Date(request.created_at).toLocaleString()}
								</td>
								<td className="px-6 py-4 flex gap-4">
									<Link to={`/dashboard/requests/${request.id}`}>
										<span className="material-symbols-outlined cursor-pointer hover:text-primaryLighter ">
											visibility
										</span>
									</Link>
									<Link to={`/dashboard/requests/${request.id}/edit`}>
										<span className="material-symbols-outlined cursor-pointer hover:text-yellow-600 ">
											edit
										</span>
									</Link>
									<span
										onClick={() => {
											setShowModal(true);
											setItemToDelete(request.id);
										}}
										className="material-symbols-outlined cursor-pointer hover:text-red-500 "
									>
										delete
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
	);
}
