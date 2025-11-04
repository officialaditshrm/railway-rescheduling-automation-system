import TrainSchedule from "../models/TrainSchedule.js";

// @desc    Get all train schedules
// @route   GET /api/trains
export const getAllTrains = async (req, res) => {
  try {
    const trains = await TrainSchedule.find();
    res.json(trains);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get train by train_number
// @route   GET /api/trains/:train_number
export const getTrainByNumber = async (req, res) => {
  try {
    const train = await TrainSchedule.findOne({ train_number: req.params.train_number });
    if (!train) return res.status(404).json({ message: "Train not found" });
    res.json(train);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Add a new train schedule
// @route   POST /api/trains
export const createTrainSchedule = async (req, res) => {
  try {
    const newTrain = new TrainSchedule(req.body);
    await newTrain.save();
    res.status(201).json(newTrain);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
