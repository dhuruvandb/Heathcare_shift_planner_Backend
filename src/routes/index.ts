import { Router } from "express";
import staffRouter from "./staff.routes";

const indexRouter = Router();

indexRouter.use([staffRouter]);

export default indexRouter;
