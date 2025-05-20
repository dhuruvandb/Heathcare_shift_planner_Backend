import { config } from "dotenv";
import express, { Request, Response } from "express";
import indexRouter from "./src/routes";
import cors from "cors";
import attendanceRouter from "./src/routes/attendence.route";
import Attendance from "./src/models/attendence.model";
config();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(indexRouter);
export default app;
