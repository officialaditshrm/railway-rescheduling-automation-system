import StationData from "../models/StationData.js";

// @desc    Get all station data
// @route   GET /api/stations
export const getAllStations = async (req, res) => {
  try {
    const stations = await StationData.find();
    res.json(stations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get station by code
// @route   GET /api/stations/:station_code
export const getStationByCode = async (req, res) => {
  try {
    const station = await StationData.findOne({ station_code: req.params.station_code });
    if (!station) return res.status(404).json({ message: "Station not found" });
    res.json(station);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Add new station data
// @route   POST /api/stations
export const createStationData = async (req, res) => {
  try {
    const newStation = new StationData(req.body);
    await newStation.save();
    res.status(201).json(newStation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
