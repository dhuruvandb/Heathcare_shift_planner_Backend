import { Router, Request, Response } from "express";
import {
  getAttendanceRecords,
  getAttendanceSummary,
  markAttendance,
  updateAttendance,
} from "../controllers/attendence.controller";

const attendanceRouter = Router();

attendanceRouter.post("/attendance", markAttendance);

attendanceRouter.put("/attendance/:id", updateAttendance);

attendanceRouter.get("/attendance", getAttendanceRecords);

attendanceRouter.get("/attendance/summary", getAttendanceSummary);

export default attendanceRouter;
