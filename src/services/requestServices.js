const IHELP_API_BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchRequests(token) {
	console.log(token, "tokena en fetchRequests");
	try {
		const response = await fetch(`${IHELP_API_BASE_URL}/requests`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching requests:", error);
		throw error;
	}
}

export async function fetchCategories(token) {
	try {
		const response = await fetch(`${IHELP_API_BASE_URL}/categories`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		throw error;
	}
}

export async function fetchRequestDetail(id, token) {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/requests/${id}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		if (!response.ok) {
			throw new Error("Error fetching request details");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		throw error;
	}
}

export async function fetchRequesters(token) {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/requesters`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (!response.ok) {
			throw new Error("Error fetching request details");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		throw error;
	}
}

export async function createRequest(requestData, token) {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/requests`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(requestData),
		});
		if (!response.ok) {
			throw new Error("Error creating request");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		throw error;
	}
}

export async function updateRequest(id, requestData, token) {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/requests/${id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(requestData),
			}
		);
		if (!response.ok) {
			throw new Error("Error updating request");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		throw error;
	}
}
