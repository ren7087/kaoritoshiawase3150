import { createContext, useState } from "react";
import { firebaseApp } from "../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router-dom";

const fireauth = firebaseApp.fireauth;

export const AuthContext = createContext();

export const useSignup = () => {
	const [error, setError] = useState(null);
	const history = useHistory();

	const signup = (email, password) => {
		setError(null);
		createUserWithEmailAndPassword(fireauth, email, password)
			.then((res) => {
				console.log(res.user);
				history.push("/login");
			})
			.catch((err) => {
				console.log(err.message);
				setError(err.message);
			});
	};

	return { error, signup };
};

export const useLogin = () => {
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(null);
	const history = useHistory();

	const login = (email, password) => {
		setError(null);
		signInWithEmailAndPassword(fireauth, email, password)
			.then(() => {
				setSuccess(true);
				history.push("/");
			})
			.catch((err) => {
				console.log(err.message);
				setError(err.message);
			});
	};

	return { success, error, login };
};
