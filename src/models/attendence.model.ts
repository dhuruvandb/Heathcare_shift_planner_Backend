import { model, Schema } from "mongoose";

const attendanceSchema = new Schema({
  date: { type: String, required: true },
  staffId: { type: String, required: true },
  shiftType: {
    type: String,
    enum: ["Morning", "Afternoon", "Night"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "On Leave"],
    required: true,
  },
  remarks: { type: String },
});

const Attendance = model("Attendance", attendanceSchema);
export default Attendance;
