import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useRequestsContext } from "../../context/RequestContext";
import socket from "../../services/socket";
import {
	formatDate,
	formatMilitaryToStandardTime,
} from "../../utils/formatters";
import SearchBar from "../../components/SearchBar";

export default function InProgressRequests() {
	const navigate = useNavigate();
	const { requests, loading, error, commitTask } = useRequestsContext();
	const [filteredRequests, setFilteredRequests] = useState([]);

	const [showModal, setShowModal] = useState(false);

	function filterRequests() {
		const inProgressStatus = 3;
		const inProgressRequests = requests.filter(
			(request) => request.status_id === inProgressStatus
		);
		setFilteredRequests(inProgressRequests.sort((a, b) => b.id - a.id));
	}

	function searchRequests(e) {
		const searchTerm = e.target.value.toLowerCase();

		const inProgressStatus = 3;
		const inProgressRequests = requests.filter(
			(request) => request.status_id === inProgressStatus
		);

		const filtered = inProgressRequests.filter(
			(request) =>
				request.requester_first_name.toLowerCase().includes(searchTerm) ||
				request.requester_last_name.toLowerCase().includes(searchTerm) ||
				request.category_name.toLowerCase().includes(searchTerm)
		);

		setFilteredRequests(filtered);
	}

	useEffect(() => {
		filterRequests();

		socket.on("requestsUpdate", (updatedRequests) => {
			switch (updatedRequests.type) {
				case "TASK_COMMITTED":
					commitTask(updatedRequests);
					filterRequests();
			}
		});

		return () => {
			socket.off("requestsUpdate");
		};
	}, [requests]);

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
										</div>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{filteredRequests.length === 0 && (
					<p className="body-text text-dark text-center py-10">
						No requests found.
					</p>
				)}
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
