import { createContext, useState } from "react";
import { firebaseApp } from "../Firebase";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useHistory, useNavigate } from "react-router-dom";

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

export const usePasswordReset = () => {
  const history = useHistory();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const passwordReset = (email) => {
    sendPasswordResetEmail(fireauth, email)
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          history.push("/login");
        }, 2000);
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      });
  };

  return { success, error, passwordReset };
};
