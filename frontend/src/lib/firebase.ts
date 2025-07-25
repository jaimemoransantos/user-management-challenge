import { initializeApp } from "firebase/app";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";

//mock data, using Firebase Realtime Database URL for local development

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "localhost",
  //   databaseURL:
  //     "http://localhost:9000/?ns=user-management-challenge-default-rtdb",
  projectId: "user-management-challenge",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

if (location.hostname === "localhost") {
  connectDatabaseEmulator(database, "localhost", 9000);
}

export { app, database };
