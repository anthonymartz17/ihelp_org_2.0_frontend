import { createContext, useContext, useState, useEffect } from "react";

import { fetchRewards } from "../services/rewardsService";

const RewardsContext = createContext({
	getRewards: () => {},
	rewards: [],
	isLoading: false,
	err: null,
});

export default function RewardsContextProvider({ children }) {
	const [rewards, setRewards] = useState([]);
	const [isLoading, setIsloading] = useState(false);
	const [error, setError] = useState(null);

	async function getRewards(token) {
		setIsloading(true);

		try {
			const data = await fetchRewards(token);
			setRewards(data);
			setError(null);
		} catch (err) {
			setError(err);
		} finally {
			setIsloading(false);
		}
	}

	const contextValue = {
		getRewards,
		rewards,
		isLoading,
		error,
	};

	return (
		<RewardsContext.Provider value={contextValue}>
			{children}
		</RewardsContext.Provider>
	);
}

export function useRewardsContext() {
	return useContext(RewardsContext);
}
