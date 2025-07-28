import { initializeApp } from "firebase/app";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";

// Firebase config has fake data for local development as no project
// has to be created to use the realtime database emulator

const firebaseConfig = {
  apiKey: "fake-api-key",
  authDomain: "localhost",
  databaseURL: "http://localhost:9000/?ns=user-management-challenge",
  projectId: "user-management-challenge",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

if (location.hostname === "localhost") {
  connectDatabaseEmulator(database, "localhost", 9000);
}

export { app, database };
