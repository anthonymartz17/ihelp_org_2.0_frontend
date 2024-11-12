const IHELP_API_BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchRequests(token) {
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
