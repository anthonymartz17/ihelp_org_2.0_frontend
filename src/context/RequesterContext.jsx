import { createContext, useContext, useState, useEffect } from "react";

import { fetchRequesters } from "../services/requesterServices";
import { useAuth } from "./AuthContext";
const RequesterContext = createContext({});

export default function RequesterContextProvider({ children }) {
	const { currentUser } = useAuth();
	const [requesters, setRequesters] = useState([]);
	const [isLoading, setIsloading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function getRequesters(token) {
			setIsloading(true);

			try {
				const data = await fetchRequesters(token);
				setRequesters(data);
			} catch (err) {
				setError(err);
			} finally {
				setIsloading(false);
				setError(null);
			}
		}

		getRequesters(currentUser.accessToken);
	}, [currentUser.accessToken]);

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
