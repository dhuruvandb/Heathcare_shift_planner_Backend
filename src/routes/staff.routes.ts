import { Request, Response, Router } from "express";

const staffRoutes = Router();

staffRoutes.post("/staff", (req: Request, res: Response) => {
  res.status(201).send("New staff member added");
});

staffRoutes.get("/staff", (req: Request, res: Response) => {
  res.status(200).json([]);
});

staffRoutes.get("/staff/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  res.status(200).json({ id });
});

staffRoutes.put("/staff/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  res.status(200).send(`Staff profile ${id} updated`);
});

staffRoutes.delete("/staff/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  res.status(200).send(`Staff profile ${id} deleted`);
});

staffRoutes.get("/search/staff", (req: Request, res: Response) => {
  res.status(200).json([]);
});

export default staffRoutes;
