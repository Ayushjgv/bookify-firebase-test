import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  updateProfile as firebaseUpdateProfile
} from "firebase/auth";

const FirebaseContext = createContext();

const firebaseConfig = {
  apiKey: "AIzaSyAfWRgufWgQNmR7iukt3xCzlStR9Y5YC0Q",
  authDomain: "test-b8add.firebaseapp.com",
  projectId: "test-b8add",
  storageBucket: "test-b8add.appspot.com",
  messagingSenderId: "196686544330",
  appId: "1:196686544330:web:2a1a8d5379b76770f16333",
  measurementId: "G-435ZVMPZGW"
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);



export const FirebaseProvider = (props) => {
  const [User, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, [])


  const isLoggedIn = User ? true : false;

  const registerUser = async (email, password, userName) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  }

  const updateProfile = async (userName) => {
    return await firebaseUpdateProfile(firebaseAuth.currentUser, {
      displayName: userName,
    });
  }

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  }

  const signInWithGoogle = () => {
    return signInWithPopup(firebaseAuth, googleProvider);
  }

  const logoutUser = () => {
    return signOut(firebaseAuth);
  }

  // console.log(User);

  const handleCreateNewListing = async (name, isbn, price) => {
    // const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
    // const uploadResult = await uploadBytes(imageRef, cover);
    await addDoc(collection(firestore, "books"), {
      name,
      isbn,
      price,
      // imageURL: uploadResult.ref.fullPath,
      userID: User.uid,
      userName: User.displayName,
      userEmail: User.email,
      photoURL: User.photoURL
    });
  }

  return (
    <FirebaseContext.Provider
      value={{ registerUser, loginUser, signInWithGoogle, isLoggedIn, logoutUser, handleCreateNewListing, updateProfile }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};





