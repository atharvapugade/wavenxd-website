// app/models/Career.js
import mongoose from "mongoose";

const careerSchema = new mongoose.Schema(
  {
    title: String,
    location: String,
    experience: String,
    description: String,
    isOpen: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Career ||
  mongoose.model("Career", careerSchema);
