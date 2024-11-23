import axios from "axios";

// Base URL of your API
const API_URL = "https://api.bseindia.com/BseIndiaAPI/api/MktHighLowDataNew/w";

// Function to scrape stock data from the API
export const scrapeStockData = async (queryParams) => {
  try {
    // Example query parameters (update as needed)
    const params = {
      EQflag: 1,
      Grpcode: "",
      HLflag: "H",
      indexcode: "",
      scripcode: queryParams?.scripcode || "", // Example: Pass stock code dynamically
    };

    // Send GET request to the API
    const response = await axios.get(API_URL, { params });
    return response.data; // Return the scraped stock data
  } catch (error) {
    console.error("Error scraping stock data:", error.message);
    throw new Error("Failed to scrape stock data");
  }
};
