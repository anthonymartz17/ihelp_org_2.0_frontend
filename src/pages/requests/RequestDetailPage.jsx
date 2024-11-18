import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { fetchRequestDetail } from "../../services/requestServices";
import { formatDate } from "../../utils/formatters";

const requestStatusColor = {
	1: "bg-blue-500",
	2: "bg-yellow-500",
	3: "bg-orange-500",
	4: "bg-green-500",
};
export default function RequestDetailPage() {
	const { currentUser } = useAuth();
	const { id } = useParams();
	const [requestDetail, setRequestDetail] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const formatTel = (tel) =>
		`(${tel.slice(0, 3)}) ${tel.slice(3, 6)} - ${tel.slice(6)}`;

	useEffect(() => {
		async function loadRequestDetails(id, token) {
			try {
				setLoading(true);
				const requestData = await fetchRequestDetail(id, token);
				setRequestDetail(requestData);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		}

		loadRequestDetails(id, currentUser.accessToken);
	}, [id]);

	if (loading) {
		return <p>Loading request details...</p>;
	}

	if (error) {
		return <p>Error: {error}</p>;
	}

	return (
		<div className="px-6 text-dark">
			<div className="flex justify-between mb-6">
				<h1 className="subtitle-heading  text-dark mb-3">Request Detail</h1>
				<Link
					to="/dashboard/requests"
					className="flex gap-2 items-center text-secondary"
				>
					<span class="material-symbols-outlined">arrow_back</span>Back
				</Link>
			</div>
			{requestDetail ? (
				<div>
					<div className="flex justify-between mb-3 gap-4  pb-2">
						<div className="card-shadow relative flex-1">
							<div className="body-text-bold flex justify-between mb-3  pb-2 border-b">
								<div>ID: {requestDetail.id}</div>
								<div
									className={`${
										requestStatusColor[requestDetail.status_id]
									} text-light px-4 rounded-b-md absolute top-0 right-4`}
								>
									{requestDetail.status_name}
								</div>
							</div>
							<div className="flex justify-between mb-3  pb-2 ">
								<div className="flex gap-2">
									<span className="body-text-bold">Hours:</span>
									<p className="body-text">{requestDetail.hours_needed} Hrs</p>
								</div>
								<div className="flex gap-2">
									<span className="body-text-bold">Created:</span>
									<p className="body-text">
										{formatDate(requestDetail.created_at)}
									</p>
								</div>
								<div className="flex gap-2">
									<span className="body-text-bold">Due:</span>
									<p className="body-text">
										{formatDate(requestDetail.updated_at)}
									</p>
								</div>
							</div>
							<div>
								<span className="body-text-bold">Description:</span>
								<p className="body-text">{requestDetail.description}</p>
							</div>
						</div>
						<div className="card-shadow relative flex-1">
							<div className="body-text-bold flex justify-between mb-3  pb-2 border-b">
								<div>Requester Information</div>
							</div>
							<div className="flex gap-2">
								<span className="body-text-bold">Name:</span>
								<p className="body-text">
									{requestDetail.requester_first_name}{" "}
									{requestDetail.requester_last_name}
								</p>
							</div>
							<div className="flex gap-2">
								<span className="body-text-bold">Phone:</span>
								<p className="body-text">
									{formatTel(requestDetail.requester_phone)}
								</p>
							</div>
						</div>
					</div>

					<div className="mt-4">
						<h3 className="subtitle-heading mb-3">Tasks </h3>

						<ul className=" grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{requestDetail.tasks.map((task) => (
								<li key={task.id} className="card-shadow relative flex-1">
									<div className="body-text-bold flex justify-between mb-3  pb-2 border-b">
										<div>
											Id: <span className="body-text">{task.id}</span>
										</div>
										<div className="flex gap-2">
											<span className="body-text-bold">Points:</span>
											<p className="body-text">{task.points_earned} Pts</p>
										</div>
									</div>

									<div className="flex gap-2">
										<span className="body-text-bold">Task:</span>
										<p className="body-text">{task.description}</p>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			) : (
				<p>No request details available</p>
			)}
		</div>
	);
}
