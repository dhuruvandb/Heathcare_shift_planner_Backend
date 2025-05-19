import { Router } from "express";
import staffRouter from "./staff.routes";
import attendanceRouter from "./attendence.route";

const indexRouter = Router();

indexRouter.use([staffRouter, attendanceRouter]);

export default indexRouter;
