const IHELP_API_BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchVolunteer(token) {
	try {
		const response = await fetch(`${IHELP_API_BASE_URL}/volunteers`, {
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
