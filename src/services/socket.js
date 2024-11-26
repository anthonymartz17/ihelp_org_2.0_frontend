import { io } from "socket.io-client";
const baseUrl = import.meta.env.VITE_API_URL;
const socket = io(baseUrl, {
	auth: {
		clientName: "Admin Interface",
	},

	withCredentials: true,
	transports: ["websocket", "polling"],
});

export default socket;
