import express from "express";
import "./shared/services/TraducoesYup";
import { router } from "./routes";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(router);

export { app };
