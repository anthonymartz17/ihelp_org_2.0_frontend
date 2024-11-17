import { RouterProvider } from "react-router-dom";
import RequestContextProvider from "./context/RequestContext";
import AuthContextProvider from "./context/AuthContext";
import router from "./router/Routes";
function App() {
	return (
		<AuthContextProvider>
			<RequestContextProvider>
				<RouterProvider router={router} />
			</RequestContextProvider>
		</AuthContextProvider>
	);
}

export default App;
