import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AppProviders from "../AppProvider.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AppProviders>
			<App />
		</AppProviders>
	</StrictMode>
);
