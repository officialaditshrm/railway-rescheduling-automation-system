import TrainSchedule from "../models/TrainSchedule.js";

// @desc    Get all train schedules (with pagination and optional date filter)
// @route   GET /api/trains?page=1&limit=10&date=YYYY-MM-DD
export const getAllTrains = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // default page 1
    const limit = parseInt(req.query.limit) || 10; // default limit 10
    const skip = (page - 1) * limit;
    const dateFilter = req.query.date; // optional date in YYYY-MM-DD format

    let filter = {};
    if (dateFilter) {
      // Filter trains that have at least one schedule with scheduled_arrival on this date
      const start = new Date(dateFilter + "T00:00:00.000Z");
      const end = new Date(dateFilter + "T23:59:59.999Z");

      filter = {
        "schedule.scheduled_arrival": { $gte: start, $lte: end }
      };
    }

    const total = await TrainSchedule.countDocuments(filter);
    const trains = await TrainSchedule.find(filter).skip(skip).limit(limit);

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      count: trains.length,
      trains,
    });
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

// @desc    Update a train schedule by train_number
// @route   PUT /api/trains/:train_number
export const updateTrainSchedule = async (req, res) => {
  try {
    const updatedTrain = await TrainSchedule.findOneAndUpdate(
      { train_number: req.params.train_number },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedTrain) return res.status(404).json({ message: "Train not found" });
    res.json(updatedTrain);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
