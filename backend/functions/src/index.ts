import { setGlobalOptions } from "firebase-functions";
import { onRequest } from "firebase-functions/https";
import express from "express";
import usersRoutes from "./routes/usersRoutes";

setGlobalOptions({ maxInstances: 10 });

const app = express();

app.use(express.json());

app.use("/users", usersRoutes);

export const api = onRequest(app);
