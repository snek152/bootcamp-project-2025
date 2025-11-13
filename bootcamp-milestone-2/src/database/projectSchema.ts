import mongoose, { Schema } from "mongoose";

// typescript type
type Project = {
  title: string;
  slug: string;
  subtitle?: string;
  description: string;
  image: string; // URL to image in public folder
  skills: string[];
  link?: string;
  github?: string;
};

// mongoose schema
const projectSchema = new Schema<Project>({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  subtitle: { type: String, required: false },
  description: { type: String, required: true },
  image: { type: String, required: true },
  skills: { type: [String], required: true },
  link: { type: String, required: false },
  github: { type: String, required: false },
});

// defining the collection and model
const Project =
  mongoose.models["projects"] || mongoose.model("projects", projectSchema);

export default Project;
