import { required } from "joi";
import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  staffId: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  role: { type: String, required: true },
  contactNumber: { type: String },
  email: { type: String },
  password: { type: String },
});

export default model("Staff", userSchema);
