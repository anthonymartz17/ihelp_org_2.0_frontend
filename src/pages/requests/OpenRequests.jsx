import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "../../components/ConfirmationModal";
import CancelRequestModal from "../../components/CancelRequestModal";
import { useRequestsContext } from "../../context/RequestContext";
import { useAuth } from "../../context/AuthContext";
import socket from "../../services/socket";
import SearchBar from "../../components/SearchBar";
import {
	formatDate,
	formatMilitaryToStandardTime,
} from "../../utils/formatters";

export default function OpenRequests() {
	const navigate = useNavigate();
	const { currentUser } = useAuth();
	const [socketUpdate, setSocketUpdate] = useState(false);

	const { requests, deleteUnassignedRequest, loading, error, commitTask } =
		useRequestsContext();
	const [filteredRequests, setFilteredRequests] = useState([]);

	const [showModal, setShowModal] = useState(false);
	const [modalType, setModalType] = useState(null);

	const [selectedItemId, setSelectedItemId] = useState(null);

	function filterOpenRequests() {
		const openStatusId = 1;
		const openRequests = requests.filter(
			(request) => request.status_id === openStatusId
		);
		setFilteredRequests(openRequests.sort((a, b) => b.id - a.id));
	}

	function onDanger(selectedRequest) {
		setShowModal(true);
		setSelectedItemId(selectedRequest.id);
		setModalType(
			selectedRequest.assigned_tasks == 0 ? "confirmDelete" : "confirmCancel"
		);
	}

	async function confirmAction() {
		try {
			const response = await deleteUnassignedRequest(
				selectedItemId,
				currentUser.accessToken
			);
			setShowModal(false);
		} catch (err) {
			//handle error
		}
	}

	async function handleConfirmCancel(reason) {
		console.log(reason)
	}

	function handleCloseModal() {
		setShowModal(false);
		setSelectedItemId(null);
		setModalType(null);
	}
	function searchRequests(e) {
		const searchTerm = e.target.value.toLowerCase();

		const openStatusId = 1;
		const openRequests = requests.filter(
			(request) => request.status_id === openStatusId
		);

		const filtered = openRequests.filter(
			(request) =>
				request.requester_first_name.toLowerCase().includes(searchTerm) ||
				request.requester_last_name.toLowerCase().includes(searchTerm) ||
				request.category_name.toLowerCase().includes(searchTerm)
		);

		setFilteredRequests(filtered);
	}

	useEffect(() => {
		filterOpenRequests();
	}, [requests, socketUpdate]);

	useEffect(() => {
		socket.on("connect_error", (error) => {
			console.log("Socket connection error:", error);
		});

		socket.on("requestsUpdate", (updatedRequests) => {
			console.log("Received updated requests:", updatedRequests.type);
			switch (updatedRequests.type) {
				case "TASK_COMMITTED":
					commitTask(updatedRequests);
			}

			setSocketUpdate((prev) => !prev);
		});

		return () => {
			socket.off("requestsUpdate");
		};
	}, []);

	return (
		<div>
			<div className="flex justify-between items-center mb-2">
				<div className="flex gap-2 justify-between items-center  w-full">
					<SearchBar onSearch={searchRequests} />
					<div>
						<button
							onClick={() => navigate("/dashboard/requests/new")}
							type="button"
							className="body-text-bold text-white bg-secondary hover:bg-secondaryLighter  btn"
						>
							+ New Request
						</button>
					</div>
				</div>
			</div>
			<div className="relative overflow-y-auto max-h-[60vh] sm:rounded-lg mt-4 ">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray ">
					<thead className="text-dark body-text-bold   dark:bg-dark dark:text-gray-400 sticky top-0">
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
								Created on
							</th>
							<th scope="col" className="px-6 py-3">
								Due on
							</th>
							<th scope="col" className="px-12 py-3 ">
								Action
							</th>
						</tr>
					</thead>

					<tbody className="body-text">
						{filteredRequests.map((request) => (
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
								<td className="px-6 py-4">{formatDate(request.created_at)}</td>
								<td className="px-6 py-4">{formatDate(request.due_date)}</td>

								<td className="px-6 py-4">
									<div className="relative group pl-6">
										<button className="hover:bg-greylight p-1 rounded-md">
											<span className="material-symbols-outlined">
												more_horiz
											</span>
										</button>
										<div className="hidden group-hover:block absolute left-0 top-0 bg-white p-2 rounded-md card-shadow min-w-[8rem] z-10">
											<Link
												className="flex gap-1 p-2 hover:bg-greylight rounded-md"
												to={`/dashboard/requests/${request.id}`}
											>
												<span className="material-symbols-outlined text-sm">
													visibility
												</span>
												<span>See detail</span>
											</Link>
											<Link
												className="flex gap-1 p-2 hover:bg-greylight rounded-md"
												to={`/dashboard/requests/${request.id}/edit`}
											>
												<span className="material-symbols-outlined text-sm">
													edit
												</span>
												<span>Edit</span>
											</Link>

											<button
												onClick={() => onDanger(request)}
												className="flex gap-1 p-2 hover:bg-greylight rounded-md w-full text-left"
											>
												{request.assigned_tasks === 0 ? (
													<div className="flex gap-1 align-middle">
														<span className="material-symbols-outlined text-sm">
															delete
														</span>
														<span>Delete</span>
													</div>
												) : (
													<div className="flex gap-1 align-middle">
														<span className="material-symbols-outlined text-sm">
															cancel
														</span>
														<span>Cancel</span>
													</div>
												)}
											</button>
										</div>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{filteredRequests.length === 0 && (
					<div className="flex justify-center items-center h-full">
						<p className="body-text h-20 flex items-center justify-center text-dark">
							No requests found.
						</p>
					</div>
				)}
			</div>
			{showModal && modalType == "confirmDelete" && (
				<ConfirmationModal
					message={"Are you sure you want to delete this request?"}
					onCancel={handleCloseModal}
					onConfirm={confirmAction}
				/>
			)}
			{showModal && modalType === "confirmCancel" && (
				<CancelRequestModal
					title="Cancel Request"
					message="Provide reason for cancellation."
					employeeUser={currentUser.email}
					onCancel={handleCloseModal}
					onConfirm={handleConfirmCancel}
				/>
			)}
		</div>
	);
}
