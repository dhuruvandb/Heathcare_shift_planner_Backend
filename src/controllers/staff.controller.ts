import { Request, Response } from "express";
import Staff from "../models/staff.model";
import { IStaff } from "../src/types";

export const createStaff = async (req: Request, res: Response) => {
  try {
    const staff: IStaff = req.body;
    const newStaff = new Staff(staff);
    await newStaff.save();
    res.status(201).json(newStaff);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getAllStaff = async (_: Request, res: Response) => {
  try {
    const staffList = await Staff.find();
    res.json(staffList);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
