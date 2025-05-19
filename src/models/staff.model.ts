import { required } from "joi";
import mongoose, { model, Schema } from "mongoose";

const staffSchema = new Schema({
  name: { type: String, required: true },
  staffId: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  role: { type: String, required: true },
  contactNumber: { type: String },
});

export default model("Staff", staffSchema);
