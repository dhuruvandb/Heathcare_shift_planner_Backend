import { Request, Response } from "express";
import Attendance from "../models/attendence.model";

export const markAttendance = async (req: Request, res: Response) => {
  const attendanceRecords = req.body;

  try {
    const conflictErrors = [];

    for (let record of attendanceRecords) {
      const { userId, date, shift } = record;

      const existingRecord = await Attendance.findOne({ userId, date });

      if (existingRecord) {
        conflictErrors.push({
          userId,
          date,
          message: `User ${userId} already has an attendance record for ${date}.`,
        });
      }
    }

    if (conflictErrors.length > 0) {
      return res.status(400).json({
        message: "Conflicts detected for some attendance records.",
        errors: conflictErrors,
      });
    }

    const result = await Attendance.insertMany(attendanceRecords);

    res.status(201).json({
      message: "Attendance records created successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving attendance records" });
  }
};

export const updateAttendance = async (req: Request, res: Response) => {
  const updatedAttendanceRecords = req.body;

  try {
    const conflictErrors = [];
    const updatedRecords = [];

    for (let record of updatedAttendanceRecords) {
      const { _id, staffId, date, status, shift } = record;

      const existingRecord = await Attendance.findOne({ userId, date });

      if (existingRecord && existingRecord._id.toString() !== _id) {
        conflictErrors.push({
          staffId,
          date,
          message: `User ${staffId} already has an attendance record for ${date}.`,
        });
      } else {
        const updatedRecord = await Attendance.findByIdAndUpdate(
          _id,
          { status, shift },
          { new: true }
        );

        if (updatedRecord) {
          updatedRecords.push(updatedRecord);
        }
      }
    }

    if (conflictErrors.length > 0) {
      return res.status(400).json({
        message: "Conflicts detected for some attendance records.",
        errors: conflictErrors,
      });
    }

    res.status(200).json({
      message: "Attendance records updated successfully",
      data: updatedRecords,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating attendance records" });
  }
};

export const getAttendanceRecords = async (req: Request, res: Response) => {
  const { date, staffId, status } = req.query;

  try {
    const filter: any = {};
    if (date) filter.date = date;
    if (staffId) filter.staffId = staffId;
    if (status) filter.status = status;

    const records = await Attendance.find(filter);
    res.json(records);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching attendance records", details: err });
  }
};

export const getAttendanceSummary = async (req: Request, res: Response) => {
  const { staffId, startDate, endDate } = req.query;

  try {
    const filter: any = {};

    if (staffId) filter.staffId = staffId;
    if (startDate && endDate) {
      filter.date = { $gte: startDate, $lte: endDate };
    }

    const summary = await Attendance.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$staffId",
          totalPresent: {
            $sum: { $cond: [{ $eq: ["$status", "Present"] }, 1, 0] },
          },
          totalAbsent: {
            $sum: { $cond: [{ $eq: ["$status", "Absent"] }, 1, 0] },
          },
          totalLeave: {
            $sum: { $cond: [{ $eq: ["$status", "On Leave"] }, 1, 0] },
          },
        },
      },
    ]);

    res.json(summary);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching attendance summary", details: err });
  }
};
