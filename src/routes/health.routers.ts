import { Router } from "express";
import {
  createHealthData,
  getHealthData
} from "../controllers/health.controller";
import { requireAuth } from "../middlewares/auth.middleware";


export const healthRoutes = Router();


healthRoutes.post(
  "/",
  requireAuth,
  createHealthData
);


healthRoutes.get(
  "/",
  requireAuth,
  getHealthData
);