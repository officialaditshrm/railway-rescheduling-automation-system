import express from "express";
import {
  getAllTrains,
  getTrainByNumber,
  createTrainSchedule
} from "../controllers/trainController.js";

const router = express.Router();

router.get("/", getAllTrains);
router.get("/:train_number", getTrainByNumber);
router.post("/", createTrainSchedule);

export default router;
