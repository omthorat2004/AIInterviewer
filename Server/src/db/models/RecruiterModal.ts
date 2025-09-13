import mongoose, { Document, Schema } from "mongoose";

export interface IRecruiter extends Document {
  name: string;
  email: string;
  passwordHash: string;
  emailVerified?: boolean;
  organization: {
    name: string;
    size?: string;
    industry?: string;
    hqLocation?: string;
  };
  preferences?: {
    interviewTypes: string[];  
    integration?: "google";   
    timezone?: string;
    languages?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const RecruiterSchema: Schema<IRecruiter> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },

    organization: {
      name: { type: String, required: true },
      size: { type: String },
      industry: { type: String },
      hqLocation: { type: String },
    },

    preferences: {
      interviewTypes: [
        { type: String, enum: ["HR", "Technical", "Mock", "Live-normal"] },
      ],
      integration: { type: String, enum: ["google"], default: "google" },
      timezone: { type: String },
      languages: [{ type: String }],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IRecruiter>("Recruiter", RecruiterSchema);
