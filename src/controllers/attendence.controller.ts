import { Request, Response } from "express";
import Attendance from "../models/attendence.model";

export const markAttendance = async (
  req: Request,
  res: Response
): Promise<any> => {
  const attendanceRecords = req.body;

  try {
    const conflictErrors = [];

    for (let record of attendanceRecords) {
      const { userId, date } = record;

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

    const result = await Attendance.insertMany(req.body);

    res.status(201).json({
      message: "Attendance records created successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving attendance records" });
  }
};
export const updateAttendance = async (
  req: Request,
  res: Response
): Promise<any> => {
  const updatedAttendanceRecords = req.body;

  try {
    const conflictErrors = [];
    const updatedRecords = [];

    const shiftMap = new Map<string, string[]>();

    for (const record of updatedAttendanceRecords) {
      const { date, department, role, shift, staffId } = record;

      const key = `${date}-${department}-${role}-${shift}`;

      if (!shiftMap.has(key)) {
        shiftMap.set(key, []);
      }

      shiftMap.get(key)!.push(staffId);
    }

    const duplicateShiftConflicts = [];
    for (const [key, staffIds] of shiftMap.entries()) {
      if (staffIds.length > 1) {
        const [date, department, role, shift] = key.split("-");
        duplicateShiftConflicts.push({
          date,
          department,
          role,
          shift,
          message: `Multiple staff members assigned to the same shift (${shift}) in ${department} (${role}) on ${date}.`,
          staffIds,
        });
      }
    }

    if (duplicateShiftConflicts.length > 0) {
      return res.status(400).json({
        message: "Shift conflicts detected in the submitted records.",
        errors: duplicateShiftConflicts,
      });
    }

    for (let record of updatedAttendanceRecords) {
      const { _id, staffId, date, status, shift } = record;

      const existingRecord = await Attendance.findOne({ staffId, date });

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
  const { date, staffId, name, page = 1, limit = 20, search = "" } = req.query;

  try {
    const filter: any = {};

    if (date) filter.date = date;
    if (staffId) filter.staffId = staffId;
    if (name) filter.name = name;

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { staffId: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [records, total] = await Promise.all([
      Attendance.find(filter).skip(skip).limit(Number(limit)),
      Attendance.countDocuments(filter),
    ]);
    res.json({ data: records, total });
  } catch (err) {
    res.status(500).json({
      error: "Error fetching attendance records",
      details: err,
    });
  }
};
