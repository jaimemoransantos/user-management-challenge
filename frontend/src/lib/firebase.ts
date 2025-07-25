import { initializeApp } from "firebase/app";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";

// Both local and Docker now use the same namespace
// No manual configuration needed - works for both environments

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
