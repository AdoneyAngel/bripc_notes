import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyB6dwxbacYrpwg_yLdHSe0XRilkMZP3Wfg",
    authDomain: "bripcnotes.firebaseapp.com",
    projectId: "bripcnotes",
    storageBucket: "bripcnotes.appspot.com",
    messagingSenderId: "845807186358",
    appId: "1:845807186358:web:764a8c7be137df94381117"
  };

const app = initializeApp(firebaseConfig);

export default app