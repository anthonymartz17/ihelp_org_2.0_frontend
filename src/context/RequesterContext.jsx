import { createContext, useContext, useState, useEffect } from "react";

import { fetchRequesters } from "../services/requesterService";

const RequesterContext = createContext({
	requesters: [],
	isLoading: false,
	error: null,
});

export default function RequesterContextProvider({ children }) {
	const [requesters, setRequesters] = useState([]);
	const [isLoading, setIsloading] = useState(false);
	const [error, setError] = useState(null);

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

	const contextValue = {
		getRequesters,
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
