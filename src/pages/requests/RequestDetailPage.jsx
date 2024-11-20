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
					<span className="material-symbols-outlined">arrow_back</span>Back
				</Link>
			</div>
			{requestDetail ? (
				<div className="">
					<div className="md:grid grid-cols-3 gap-2 mb-6">
						<div className="card-shadow relative flex-1">
							<div className="flex justify-between mb-3  pb-2 border-b">
								<p className="body-text-bold ">Request</p>
							</div>
							<div className="flex flex-col gap-2 ">
								<div className="flex justify-between  items-center bg-greylight bg-opacity-40 p-2 ">
									<span className="flex items-center body-text opacity-60">
										<span class="material-symbols-outlined">key</span>
										<span>ID</span>
									</span>
									<p className="body-text">{requestDetail.id}</p>
								</div>

								<div className="flex justify-between  items-center px-2">
									<span className="flex items-center body-text opacity-60">
										<span className="material-symbols-outlined">schedule</span>
										<span>Hours</span>
									</span>
									<p className="body-text">{requestDetail.hours_needed} Hrs</p>
								</div>

								<div className="flex justify-between items-center  bg-greylight bg-opacity-40 p-2 ">
									<span className="flex items-center body-text opacity-60">
										<span className="material-symbols-outlined">
											calendar_month
										</span>
										<span>Created</span>
									</span>
									<p className="body-text">
										{formatDate(requestDetail.created_at)}
									</p>
								</div>
								<div className="flex justify-between items-center px-2">
									<span className="flex items-center body-text opacity-60">
										<span className="material-symbols-outlined">event</span>
										<span>Due</span>
									</span>
									<p className="body-text">
										{formatDate(requestDetail.updated_at)}
									</p>
								</div>
							</div>
							<div className="mt-4 px-2">
								<span className="flex items-center body-text opacity-60 mb-1">
									<span class="material-symbols-outlined">description</span>
									<span>Description</span>
								</span>

								<textarea
									id="description"
									className="w-full body-text p-2 border border-greylight rounded-md"
									value={requestDetail.description}
									col="3"
									rows="3"
								></textarea>
							</div>
						</div>
						<div className="card-shadow relative flex-1">
							<div className="flex justify-between mb-3  pb-2 border-b">
								<p className="body-text-bold ">Requester</p>
							</div>
							<div className="flex flex-col gap-2">
								<div className="flex justify-between  items-center  bg-greylight bg-opacity-40 p-2 ">
									<span className="flex items-center body-text opacity-60">
										<span className="material-symbols-outlined ">person</span>
										<span>Requester</span>
									</span>
									<p className="body-text">
										{requestDetail.requester_first_name}{" "}
										{requestDetail.requester_last_name}
									</p>
								</div>
								<div className="flex justify-between items-center px-2">
									<span className="flex items-center body-text opacity-60">
										<span className="material-symbols-outlined">call</span>
										<span>Phone</span>
									</span>
									<p className="body-text">
										{formatTel(requestDetail.requester_phone)}
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className="flex-1">
						<h3 className="subtitle-heading mb-3">Tasks </h3>

						<ul className="grid md:grid-cols-2 gap-2">
							{requestDetail.tasks.map((task) => (
								<li key={task.id} className="card-shadow relative flex-1 ">
									<div
										className={`${
											requestStatusColor[task.task_status_id]
										} text-light body-text-bold px-4 rounded-b-md absolute top-0 right-4`}
									>
										{task.task_status_name}
									</div>
									{task.task_status_id !== 1 && (
										<div className=" mb-3  pb-2 border-b">
											<div className="flex gap-2">
												<img
													src={task.volunteer_avatar}
													alt=""
													className="w-8"
												/>
												<div>
													<p className="body-text-bold">
														{task.volunteer_name}
													</p>
													<p className="body-text">{task.volunteer_email}</p>
												</div>
											</div>
										</div>
									)}

									<div className="body-text-bold flex justify-between mb-3  py-2 ">
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
				<p>No requests Found</p>
			)}
		</div>
	);
}
