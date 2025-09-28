// import mongoose, { Schema, Document } from "mongoose";

// export interface IUser extends Document {
//     name: string;
//     email: string;
//     password: string;
//     role: "student" | "teacher" | "parent" | "admin";
//     isActive: boolean;
// }

// const userSchema = new Schema<IUser>(
//     {
//         name: { type: String, required: true },
//         email: { type: String, required: true, unique: true },
//         password: { type: String, required: true },
//         role: {
//             type: String,
//             enum: ["student", "teacher", "parent", "admin"],
//             default: "student",
//         },
//         isActive: { type: Boolean, default: false },
//     },
//     { timestamps: true }
// );

// export default mongoose.model<IUser>("User", userSchema);

// models/User.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "student" | "teacher" | "parent" | "admin";
  isActive: boolean;
  college?: string;
  school?: string;
  progress?: {
    moduleId: number;
    completed: boolean;
    score?: number;
  }[];
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "teacher", "parent", "admin"],
      default: "student",
    },
    isActive: { type: Boolean, default: false },
    college: { type: String },
    school: { type: String },
    progress: [
      {
        moduleId: Number,
        completed: Boolean,
        score: Number,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
