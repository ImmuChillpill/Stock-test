import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const trackSchema = new mongoose.Schema({
  symbol: { type: String, required: true }, // Stock ticker symbol (e.g., "AAPL")
  price: { type: Number, required: true }, // Stock price
  date: { type: Date, default: Date.now }, // Date and time of the record
});

trackSchema.plugin(mongoosePaginate);

const TrackModel = mongoose.model("Track", trackSchema);

export default TrackModel;
