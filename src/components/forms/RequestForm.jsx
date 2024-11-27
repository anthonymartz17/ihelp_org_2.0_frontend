import React, { useState, useEffect } from "react";
import { fetchCategories } from "../../services/requestServices";
import { extractDate } from "../../utils/formatters";
import {
	fetchRequesters,
	fetchRequestDetail,
} from "../../services/requestServices";
import { useAuth } from "../../context/AuthContext";
import { useRequestsContext } from "../../context/RequestContext";
import { useParams, useNavigate } from "react-router-dom";

export default function RequestForm() {
	const navigate = useNavigate();
	const { createNewRequest, updateRequestById } = useRequestsContext();
	const { id } = useParams();
	const { currentUser } = useAuth();

	const [formData, setFormData] = useState({
		organization_id: 1,
		requester_id: "",
		description: "",
		category_id: "",
		due_date: "",
		hours_needed: 1,
		event_time: "",
		tasks: [],
	});

	const [task, setTask] = useState({ task: "", point_earnings: "" });
	const [requesters, setRequesters] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const [categories, setCategories] = useState([]);

	function handleAddTask() {
		setFormData((prev) => ({ ...prev, tasks: [...prev.tasks, task] }));
		setTask({ task: "", point_earnings: "" });
	}

	function handleDeleteTask(index) {
		setFormData((prev) => ({
			...prev,
			tasks: prev.tasks.filter((_, idx) => idx !== index),
		}));
	}

	function handleChange(e) {
		const { name, value } = e.target;

		setFormData((prev) => ({ ...prev, [name]: value }));
	}

	function handleTaskChange(e) {
		const { name, value } = e.target;
		setTask((prev) => ({ ...prev, [name]: value }));
	}
	function test() {
		console.log("formData");
	}
	async function handleSubmit(e) {
		console.log(e);
		e.preventDefault();
		try {
			if (id) {
				await updateRequestById(id, formData, currentUser.accessToken);
			} else {
				await createNewRequest(formData, currentUser.accessToken);
			}
			navigate("/dashboard/requests/open");
		} catch (error) {
			console.error("Failed to submit request:", error);
		}
	}

	useEffect(() => {
		async function onLoad(token) {
			setLoading(true);
			try {
				const requestersData = await fetchRequesters(token);
				const categoriesData = await fetchCategories(token);
				setRequesters(
					requestersData.map((requester) => ({
						full_name: `${requester.first_name} ${requester.last_name}`,
						id: requester.id,
					}))
				);
				setCategories(categoriesData);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		}
		onLoad(currentUser.accessToken);
	}, []);

	useEffect(() => {
		if (id) {
			async function onLoad(token) {
				try {
					setLoading(true);
					const requestData = await fetchRequestDetail(id, token);
					setFormData({
						...requestData,
						due_date: extractDate(requestData.due_date),
					});
				} catch (error) {
					setError(error.message);
				} finally {
					setLoading(false);
				}
			}
			onLoad(currentUser.accessToken);
		}
	}, [id]);

	return (
		<div className="flex items-center justify-center body-text text-dark">
			{loading && (
				<div className="flex justify-center pt-40 h-screen">
					<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-light"></div>
				</div>
			)}

			{!loading && !error && (
				<form className="w-[100%] p-[5px_20px]" onSubmit={handleSubmit}>
					<div className="flex gap-4">
						<div className="p-2 w-[50%] card-shadow">
							<div className="flex items-center gap-7 mb-3 ">
								<label className="w-[50%] ">
									<span className="roboto-bold">Requester</span>
									<br />
									<select
										name="requester_id"
										value={formData.requester_id}
										onChange={handleChange}
										className="border text-dark border-gray-500 border-opacity-20 rounded-md p-[5px_10px] w-[100%] mt-[3%] "
									>
										<option disabled value="">
											Select
										</option>
										{requesters.map((requester) => (
											<option key={requester.id} value={requester.id}>
												{requester.full_name}
											</option>
										))}
									</select>
								</label>

								<label className="w-[50%]">
									<span className="roboto-bold">Category</span>

									<br />
									<select
										name="category_id"
										value={formData.category_id}
										onChange={handleChange}
										className="border border-gray-500 border-opacity-20  rounded-md p-[5px_10px] w-[100%] mt-[3%]"
									>
										<option disabled value="">
											Select
										</option>
										{categories.map((category) => (
											<option key={category.id} value={category.id}>
												{category.name}
											</option>
										))}
									</select>
								</label>
							</div>

							<div className="flex flex-col gap-4 mt-5">
								<label className="flex flex-col gap-2">
									<span className="roboto-bold">General Description</span>
									<textarea
										name="description"
										value={formData.description}
										onChange={handleChange}
										className="border border-gray-500 border-opacity-20  rounded-md p-[5px_10px] w-[100%] resize-none h-[300px] overflow-scroll"
										placeholder="Write your description..."
										style={{ maxHeight: "150px" }}
									/>
								</label>

								<div className="flex items-center gap-7">
									<label className="flex flex-col gap-2">
										<span className="roboto-bold"> Due Date</span>
										<input
											type="date"
											name="due_date"
											value={formData.due_date}
											onChange={handleChange}
											className="border border-gray-500 border-opacity-20  rounded-md p-[5px_10px] w-[100%]"
										/>
									</label>
									<label className="flex flex-col gap-2">
										<span className="roboto-bold">Hours Required</span>
										<input
											type="number"
											name="hours_needed"
											value={formData.hours_needed}
											onChange={handleChange}
											className="border border-gray-500 border-opacity-20  rounded-md p-[5px_10px] w-[100%]"
										/>
									</label>
									<label className="flex flex-col gap-2">
										<span className="roboto-bold">Time</span>
										<input
											type="time"
											name="event_time"
											step={"300"}
											value={formData.event_time}
											onChange={handleChange}
											className="border border-gray-500 border-opacity-20  rounded-md p-[5px_10px] w-[100%]"
										/>
									</label>
								</div>
							</div>
						</div>

						<div className="p-2 w-[50%] card-shadow ">
							<span className="roboto-bold">Tasks</span>
							<div className="  rounded-lg py-4 mt-[1%] h-[90%]">
								<div className="grid grid-cols-[6fr_1fr_1fr] gap-4 mb-4">
									<input
										type="text"
										placeholder="Describe Task"
										value={task.task}
										name="task"
										onChange={handleTaskChange}
										className="border border-gray-500 border-opacity-20  rounded-md p-[5px_10px]"
									/>
									<input
										type="number"
										placeholder="point_earnings"
										name="point_earnings"
										value={task.point_earnings}
										onChange={handleTaskChange}
										className="border border-gray-500 border-opacity-20  rounded-md p-[5px_10px]"
									/>
									<button
										type="button"
										className="bg-primary text-white rounded-md p-[5px_10px]"
										onClick={() => handleAddTask()}
									>
										Add
									</button>
								</div>

								<ul className="list-disc  p-1 max-h-[200px] overflow-y-auto">
									{formData.tasks.map((task, index) => (
										<li
											key={index}
											className="flex gap-4 justify-between items-center card-shadow mb-1"
										>
											<div className="flex justify-between items-center w-full body-text">
												<span>{task.task}</span>
												<span>{task.point_earnings} Points</span>
											</div>
											<button
												type="button"
												className="text-red-500 hover:text-red-400"
												onClick={() => handleDeleteTask(index)}
											>
												<span className="material-symbols-outlined">
													delete
												</span>
											</button>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>

					<div className="flex justify-end w-[100%] mt-[1.5%]">
						<button
							onClick={() => test()}
							className="bg-secondary text-white rounded-lg p-[5px_20px]"
						>
							Submit
						</button>
					</div>
				</form>
			)}
		</div>
	);
}
