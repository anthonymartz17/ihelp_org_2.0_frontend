import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useRequestsContext } from "../../context/RequestContext";
import socket from "../../services/socket";
import SearchBar from "../../components/SearchBar";
import { formatDate } from "../../utils/formatters";

export default function CancelledRequests() {
	const navigate = useNavigate();
	const [socketUpdate, setSocketUpdate] = useState(false);

	const { requests, loading, error, commitTask } = useRequestsContext();
	const [filteredRequests, setFilteredRequests] = useState([]);

	function filterCancelledRequests() {
		const cancelledStatusId = 5;
		const cancelledRequests = requests.filter(
			(request) => request.status_id === cancelledStatusId
		);
		setFilteredRequests(cancelledRequests.sort((a, b) => b.id - a.id));
	}
	function searchRequests(e) {
		const searchTerm = e.target.value.toLowerCase();

		const cancelledStatusId = 5;
		const cancelledRequests = requests.filter(
			(request) => request.status_id === cancelledStatusId
		);

		const filtered = cancelledRequests.filter(
			(request) =>
				request.requester_first_name.toLowerCase().includes(searchTerm) ||
				request.requester_last_name.toLowerCase().includes(searchTerm) ||
				request.category_name.toLowerCase().includes(searchTerm)
		);

		setFilteredRequests(filtered);
	}

	function searchRequests(e) {
		const searchTerm = e.target.value.toLowerCase();

		const cancelledStatusId = 5;
		const cancelledRequests = requests.filter(
			(request) => request.status_id === cancelledStatusId
		);

		const filtered = cancelledRequests.filter(
			(request) =>
				request.requester_first_name.toLowerCase().includes(searchTerm) ||
				request.requester_last_name.toLowerCase().includes(searchTerm) ||
				request.category_name.toLowerCase().includes(searchTerm)
		);

		setFilteredRequests(filtered);
	}


	useEffect(() => {
		filterCancelledRequests();
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
								Cancelled on
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
		</div>
	);
}
