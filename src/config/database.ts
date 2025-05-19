import dotenv from "dotenv";
import { connect } from "mongoose";
dotenv.config();
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/Health-care";

export const connectToDB = async () => {
  try {
    if (!MONGO_URI) {
      console.error("MONGO_DB_URI environment variable is not defined.");
      return;
    }
    const db = await connect(MONGO_URI);
    console.log("MongoDB connected to", db.connection.name);
  } catch (error) {
    console.error(error);
  }
};
