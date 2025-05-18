import { createContext, useContext, useState, useEffect } from "react";

import { fetchRequesters } from "../services/requesterServices";
import { useAuth } from "./AuthContext";
const RequesterContext = createContext({
	requesters: [],
	isLoading: false,
	error: null,
});

export default function RequesterContextProvider({ children }) {
	const { currentUser } = useAuth();
	const [requesters, setRequesters] = useState([]);
	const [isLoading, setIsloading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!currentUser?.accessToken) return;

		async function getRequesters(token) {
			setIsloading(true);

			try {
				const data = await fetchRequesters(token);
				setRequesters(data);
				setError(null);
			} catch (err) {
				setError(err);
			} finally {
				setIsloading(false);
			}
		}

		getRequesters(currentUser.accessToken);
	}, [currentUser?.accessToken]);

	const contextValue = {
		requesters,
		isLoading,
		error,
	};

	return (
		<RequesterContext.Provider value={contextValue}>
			{children}
		</RequesterContext.Provider>
	);
}

export function useRequestersContext() {
	return useContext(RequesterContext);
}
