import { createContext, useContext, useEffect, useState } from "react";
import {
	fetchRequests,
	createRequest,
	updateRequest,
} from "../services/requestServices";
import { useAuth } from "./AuthContext";
const RequestContext = createContext({});

export default function RequestContextProvider({ children }) {
	const { currentUser } = useAuth();
	const [requests, setRequests] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	async function getRequests() {
		setLoading(true);
		try {
			const data = await fetchRequests(currentUser.accessToken);
			setRequests(data);
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	}

	function commitTask(request) {
		console.log(request, "request to update task");
		setRequests((prev) =>
			prev.map((req) => {
				if (req.id === request.requestId) {
					const updatedRequest = {
						...req,
						assigned_tasks: req.assigned_tasks + 1,
					};
					console.log(prev);
					console.log(updatedRequest, "updated");

					if (updatedRequest.assigned_tasks === updatedRequest.total_tasks) {
						const assignedStatusId = 2;
						updatedRequest.status_id = assignedStatusId;
						updatedRequest.status_name = "ASSIGNED";
					}
					return updatedRequest;
				} else {
					return req;
				}
			})
		);
	}

	async function createNewRequest(request, token) {
		try {
			const newRequest = await createRequest(request, token);
			setRequests((prev) => [...prev, newRequest]);
		} catch (err) {
			throw new Error("Failed to create new request:", err);
		}
	}
	async function updateRequestById(requestId, updatedRequest, token) {
		try {
			const updatedRequestData = await updateRequest(
				requestId,
				updatedRequest,
				token
			);
			setRequests((prev) =>
				prev.map((request) =>
					request.id === requestId ? updatedRequestData : request
				)
			);
		} catch (err) {
			throw new Error("Failed to update request:", err);
		}
	}

	const contextValue = {
		requests,
		loading,
		error,
		setRequests,
		getRequests,
		commitTask,
		createNewRequest,
		updateRequestById,
	};

	return (
		<RequestContext.Provider value={contextValue}>
			{children}
		</RequestContext.Provider>
	);
}

export function useRequestsContext() {
	return useContext(RequestContext);
}
