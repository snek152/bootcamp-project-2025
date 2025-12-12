import mongoose, { Schema } from "mongoose";

// typescript type for comments
export type IComment = {
  user: string;
  comment: string;
  time: Date;
};

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
  comments: IComment[];
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
  comments: [
    {
      user: { type: String, required: true },
      comment: { type: String, required: true },
      time: { type: Date, required: true, default: new Date() },
    },
  ],
});

// defining the collection and model
const Project =
  mongoose.models["projects"] || mongoose.model("projects", projectSchema);

export default Project;
