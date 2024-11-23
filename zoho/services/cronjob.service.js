import cron from "node-cron";
import { scrapeStockData } from "./scrape.service.js";
import TrackModel from "../models/track.model.js";

export const startCronJob = () => {
  cron.schedule("0 9 * * 1-5", async () => {
    console.log("Cron job running: Scraping stock data");

    // Example stock codes to track
    const stockCodes = ["500112", "532540", "500325"]; // Replace with actual stock codes

    for (const code of stockCodes) {
      try {
        const data = await scrapeStockData({ scripcode: code });

        // Assuming the API returns an array of stock details
        if (data && Array.isArray(data.Table)) {
          for (const stock of data.Table) {
            const newStock = new TrackModel({
              symbol: stock.SC_NAME, // Example: Stock Name
              price: stock.SC_LTP,  // Example: Last Traded Price
            });
            await newStock.save();
          }
        }

        console.log(`Stock data saved for code: ${code}`);
      } catch (error) {
        console.error(`Failed to save stock data for code: ${code}`, error.message);
      }
    }
  });
};
