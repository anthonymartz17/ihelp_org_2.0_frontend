import { createContext, useContext, useState, useEffect } from "react";

import { auth } from "../../firebase-config";

import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	sendPasswordResetEmail,
	onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext({
	currentUser: {},
	signUp: () => {},
	login: () => {},
	logout: () => {},
	resetPassword: () => {},
});

export default function AuthContextProvider({ children }) {
	const [currentUser, setCurrentUser] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	async function signUp(email, password) {
		try {
			setLoading(true);
			await createUserWithEmailAndPassword(auth, email, password);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}
	async function login(email, password) {
		try {
			setLoading(true);
			await signInWithEmailAndPassword(auth, email, password);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}
	async function logout() {
		try {
			setLoading(true);
			await signOut(auth);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}
	async function resetPassword(email) {
		try {
			setLoading(true);
			await sendPasswordResetEmail(auth, email);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
		});

		return () => unsubscribe();
	}, []);

	const ctxValue = {
		currentUser,
		isLoggedIn: !!currentUser,
		loading,
		error,
		signUp,
		login,
		logout,
		resetPassword,
	};

	return (
		<AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
