import React from "react";
import { useNavigate } from "react-router-dom";
import RequestForm from "../../components/forms/RequestForm";
import { useRequestsContext } from "../../context/RequestContextProvider";

export default function NewRequestPage() {
	const navigate = useNavigate();
	const { setRequests,getRequests } = useRequestsContext();

	const handleSubmit = async (formData) => {
		const requestData = {
			requester: formData.requester,
			category: formData.category,
			description: formData.description,
			due_date: formData.due_date,
			event_time: formData.event_time,
			tasks: formData.tasks.map((task) => ({
				task: task.task,
				point_earnings: task.point_earnings,
			})),
			hours_needed: formData.hours_needed,
		};

		try {
			const token = localStorage.getItem("token");
			const response = await fetch(`${import.meta.env.VITE_API_URL}/requests`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(requestData),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					`Failed to create request: ${response.status} ${errorData.message}`
				);
			}
			const newRequest = await response.json();

			// setRequests((prevRequests) => [...prevRequests, newRequest])
			getRequests();
			navigate("/dashboard");
		} catch (error) {
			console.error("Error creating request:", error.message);
		}
	};

	return (
		<div>
			<h1 className="ml-4 text-[18px] font-bold mb-4">New Request</h1>
			<RequestForm onSubmit={handleSubmit} />
		</div>
	);
}
