import app from "./firebaseApp"
import { getStorage } from "firebase/storage"

const storage = getStorage(app)

export default storage