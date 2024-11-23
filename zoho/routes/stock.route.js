import express from "express";
import { scrapeStockData } from "../services/scrape.service.js";

const router = express.Router();

router.get("/scrape", async (req, res) => {
  try {
    const { scripcode } = req.query;
    if (!scripcode) {
      return res.status(400).json({ message: "scripcode is required" });
    }

    const data = await scrapeStockData({ scripcode });
    res.status(200).json({ message: "Scraped stock data successfully", data });
  } catch (error) {
    res.status(500).json({ message: "Failed to scrape stock data", error: error.message });
  }
});

export default router;
