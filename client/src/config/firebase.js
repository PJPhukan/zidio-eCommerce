import { initializeApp } from "firebase/app";
import {
	getAuth,
	GoogleAuthProvider,
	FacebookAuthProvider,
	signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAM5Vj_8MYxJo5eM97MGrQ3vKQ2jq8MAPE",
	authDomain: "e-commerce-4ae08.firebaseapp.com",
	projectId: "e-commerce-4ae08",
	storageBucket: "e-commerce-4ae08.firebasestorage.app",
	messagingSenderId: "238839538686",
	appId: "1:238839538686:web:5618ea5f10e848ab6fd6af",
	measurementId: "G-C9YL616EFT",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider, signInWithPopup };
