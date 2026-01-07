// app/models/Industry.js
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  technicalPapers: [
    {
      title: String,
      fileUrl: String,
    },
  ],
});

const industrySchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    heroImage: String,
    description: String,
    applications: [applicationSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Industry ||
  mongoose.model("Industry", industrySchema);
