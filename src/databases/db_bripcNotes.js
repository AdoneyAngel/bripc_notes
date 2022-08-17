import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB6dwxbacYrpwg_yLdHSe0XRilkMZP3Wfg",
    authDomain: "bripcnotes.firebaseapp.com",
    projectId: "bripcnotes",
    storageBucket: "bripcnotes.appspot.com",
    messagingSenderId: "845807186358",
    appId: "1:845807186358:web:764a8c7be137df94381117"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

export default db
