import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where } from "firebase/firestore";
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

  const ListAllBooks = () => {
    return getDocs(collection(firestore, "books"));
  };

  const getBookByID = async (id) => {
    const docref = doc(firestore, "books", id);
    const result = await getDoc(docref);
    return result;
  }

  const placeOrder = async (bookId, qty) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const result = await addDoc(collectionRef, {
      qty,
      bookId,
      userId: User.uid,
      userEmail: User.email,
      userName: User.displayName,
      photoURL: User.photoURL
    });

    return result;
  }


  const fetchMyBooks = async (userId) => {
    const collectionRef = collection(firestore, 'books');
    const q = query(collectionRef, where("userID", "==", userId));
    const result = await getDocs(q);
    return result;
  }

  const getOrders = async (bookId) => {
    const collectionRef = collection(firestore, 'books', bookId, 'orders');
    const result = await getDocs(collectionRef);
    return result;
  }

  const isLoggedIn = User ? true : false;


  return (
    <FirebaseContext.Provider
      value={{
        registerUser,
        loginUser,
        signInWithGoogle,
        isLoggedIn,
        logoutUser,
        handleCreateNewListing,
        updateProfile,
        ListAllBooks,
        getBookByID,
        placeOrder,
        fetchMyBooks,
        User,
        getOrders
      }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};





