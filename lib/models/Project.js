import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    customer: { type: String, required: true },
    location: { type: String, default: "Nashik" },
    testimonial: { type: String, default: "" },
    images: { type: [String], default: [] }, // array of Cloudinary URLs or local paths
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
