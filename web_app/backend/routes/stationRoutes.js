import express from "express";
import {
  getAllStations,
  getStationByCode,
  createStationData
} from "../controllers/stationController.js";

const router = express.Router();

router.get("/", getAllStations);
router.get("/:station_code", getStationByCode);
router.post("/", createStationData);

export default router;
