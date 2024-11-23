import TrackModel from "../models/track.model.js";

// Get all stock details (supports pagination)
export const getAllStocks = async (req, res) => {
  const { symbol, page = 1, limit = 10 } = req.query;

  try {
    const query = symbol ? { symbol } : {};
    const options = { page: parseInt(page), limit: parseInt(limit) };
    const stocks = await TrackModel.paginate(query, options);

    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stock data", error: error.message });
  }
};

// Add a new stock record
export const addStock = async (req, res) => {
  const { symbol, price } = req.body;

  if (!symbol || !price) {
    return res.status(400).json({ message: "Symbol and price are required" });
  }

  try {
    const stock = new TrackModel({ symbol, price });
    await stock.save();

    res.status(201).json({ message: "Stock added successfully", data: stock });
  } catch (error) {
    res.status(500).json({ message: "Error adding stock", error: error.message });
  }
};
