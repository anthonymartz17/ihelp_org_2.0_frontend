import { createContext, useContext, useState, useEffect } from "react";

import { fetchVolunteer } from "../services/volunteerService";
import { useAuth } from "./AuthContext";

const VolunteerContext = createContext({
	volunteers: [],
	isLoading: false,
	error: null,
});

export default function VolunteerContextProvider({ children }) {
	const { currentUser } = useAuth();
	const [volunteers, setVolunteers] = useState([]);
	const [isLoading, setIsloading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!currentUser?.accessToken) return;

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

		getVolunteers(currentUser.accessToken);
	}, [currentUser?.accessToken]);

	const contextValue = {
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
