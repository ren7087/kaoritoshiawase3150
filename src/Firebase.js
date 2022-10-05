// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDA1veJhYAws0kqVFuP4gCTcQ21gZV_Q0Y",
	authDomain: "kaoritoshiawase3150-a7eb4.firebaseapp.com",
	projectId: "kaoritoshiawase3150-a7eb4",
	storageBucket: "kaoritoshiawase3150-a7eb4.appspot.com",
	messagingSenderId: "464808270377",
	appId: "1:464808270377:web:fb13e8a758894825729a38",
	measurementId: "G-G33GB2N0YE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const fireauth = getAuth(app);
const firestorage = getStorage(app);

export const firebaseApp = {
	app,
	firestore,
	fireauth,
	firestorage,
	analytics,
};
