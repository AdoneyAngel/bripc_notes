import app from "./firebaseApp"
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


const analytics = getAnalytics(app);
const db = getFirestore(app)

export default db
