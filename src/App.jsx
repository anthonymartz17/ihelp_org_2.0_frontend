import { RouterProvider } from "react-router-dom";
import { RequestContextProvider } from "./context/RequestContextProvider";

import router from "./router/Routes";
function App() {
	return (
		<div>
			<RequestContextProvider>
				<RouterProvider router={router} />
			</RequestContextProvider>
		</div>
	);
}

export default App;
