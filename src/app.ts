import { config } from "dotenv";
import express from "express";
import indexRouter from "./routes";

config();

const app = express();

app.use(express.json());

app.use(indexRouter);

export default app;
