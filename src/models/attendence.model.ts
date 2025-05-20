import { model, Schema } from "mongoose";

const attendanceSchema = new Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  staffId: { type: String, required: true },
  department: { type: String, required: true },
  role: { type: String, required: true },
  shift: {
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
