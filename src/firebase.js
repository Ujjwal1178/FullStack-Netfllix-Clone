import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
// import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyC_mVMeslM5-lFszfeGlm6FUTCeCQCNYuQ",
  authDomain: "netflix-clone-525f8.firebaseapp.com",
  projectId: "netflix-clone-525f8",
  storageBucket: "netflix-clone-525f8.appspot.com",
  messagingSenderId: "932630896506",
  appId: "1:932630896506:web:547cdac71f48296f9d40c3",
  measurementId: "G-QYCY3YYVW8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    toast.success("Welcome to this clone world");
  } catch (error) {
    console.log(error);
    // alert(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("You are logged In");
  } catch (error) {
    console.log(error);
    // alert(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const logout = () => {
  signOut(auth);
  toast.success("You are logged out");
};

export { auth, db, login, signup, logout };
