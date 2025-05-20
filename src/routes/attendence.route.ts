import { Router } from "express";
import {
  getAttendanceRecords,
  markAttendance,
  updateAttendance,
} from "../controllers/attendence.controller";

const attendanceRouter = Router();

attendanceRouter.post("/attendance", markAttendance);

attendanceRouter.put("/attendance/", updateAttendance);

attendanceRouter.get("/attendance", getAttendanceRecords);

export default attendanceRouter;
