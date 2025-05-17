import AuthContextProvider from "./src/context/AuthContext";
import RequestContextProvider from "./src/context/RequestContext";
import RequesterContextProvider from "./src/context/RequesterContext";
// import VolunteerContextProvider from "./context/VolunteerContext";
// import BadgeContextProvider from "./context/BadgeContext";

export default function AppProviders({ children }) {
	return (
		<AuthContextProvider>
			<RequestContextProvider>
				<RequesterContextProvider>{children}</RequesterContextProvider>
			</RequestContextProvider>
		</AuthContextProvider>
	);
}
