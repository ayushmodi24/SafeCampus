import mongoose, { Schema, Document } from "mongoose";

export interface IModule extends Document {
  title: string;
  description: string;
  icon: string; // frontend can map icon names
}

const moduleSchema = new Schema<IModule>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IModule>("Module", moduleSchema);
