import { createContext, useContext, useState, useEffect } from "react";

import { fetchVolunteer } from "../services/volunteerService";

const VolunteerContext = createContext({
	volunteers: [],
	isLoading: false,
	error: null,
});

export default function VolunteerContextProvider({ children }) {
	const [volunteers, setVolunteers] = useState([]);
	const [isLoading, setIsloading] = useState(false);
	const [error, setError] = useState(null);

	async function getVolunteers(token) {
		setIsloading(true);

		try {
			const data = await fetchVolunteer(token);
			setVolunteers(data);
			setError(null);
		} catch (err) {
			setError(err);
		} finally {
			setIsloading(false);
		}
	}

	const contextValue = {
		getVolunteers,
		volunteers,
		isLoading,
		error,
	};

	return (
		<VolunteerContext.Provider value={contextValue}>
			{children}
		</VolunteerContext.Provider>
	);
}

export function useVolunteerContext() {
	return useContext(VolunteerContext);
}
