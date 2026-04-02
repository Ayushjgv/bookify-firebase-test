import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";

const FirebaseContext = createContext();

const firebaseConfig = {
  apiKey: "AIzaSyAfWRgufWgQNmR7iukt3xCzlStR9Y5YC0Q",
  authDomain: "test-b8add.firebaseapp.com",
  projectId: "test-b8add",
  storageBucket: "test-b8add.firebasestorage.app",
  messagingSenderId: "196686544330",
  appId: "1:196686544330:web:2a1a8d5379b76770f16333",
  measurementId: "G-435ZVMPZGW"
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);

export const FirebaseProvider = (props)=>{
  return <FirebaseContext.Provider>{props.children}</FirebaseContext.Provider>
};





