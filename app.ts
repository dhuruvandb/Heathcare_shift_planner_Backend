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

app.post("/attendance", async (req: Request, res: Response): Promise<any> => {
  try {
    const { date, staffId, shiftType, status, remarks } = req.body;

    const existingRecord = await Attendance.findOne({
      staffId,
    });
    if (existingRecord) {
      return res
        .status(400)
        .json({ error: "Attendance already recorded for this shift." });
    }

    const newAttendance = new Attendance({
      date,
      staffId,
      shiftType,
      status,
      remarks,
    });
    await newAttendance.save();
    res.status(201).json(newAttendance);
  } catch (err) {
    res.status(500).json({ error: "Error marking attendance", details: err });
  }
});
export default app;
