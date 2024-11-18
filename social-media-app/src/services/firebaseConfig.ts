import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBv6ZCPDilcioDCOweMon7sCa_H6nKYW0o",
  authDomain: "react-test-raftlab.firebaseapp.com",
  projectId: "react-test-raftlab",
  storageBucket: "react-test-raftlab.firebasestorage.app",
  messagingSenderId: "943760617148",
  appId: "1:943760617148:web:aabfdabbd9bdcd6020eab9",
  measurementId: "G-J245E5FGBP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
