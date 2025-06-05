import AuthContextProvider from "./src/context/AuthContext";
import RequestContextProvider from "./src/context/RequestContext";
import RequesterContextProvider from "./src/context/RequesterContext";
import RewardsContextProvider from "./src/context/RewardsContext";
import VolunteerContextProvider from "./src/context/VolunteerContext";
// import BadgeContextProvider from "./context/BadgeContext";

export default function AppProviders({ children }) {
	return (
		<AuthContextProvider>
			<RequestContextProvider>
				<RequesterContextProvider>
					<RewardsContextProvider>
						<VolunteerContextProvider>{children}</VolunteerContextProvider>
					</RewardsContextProvider>
				</RequesterContextProvider>
			</RequestContextProvider>
		</AuthContextProvider>
	);
}
