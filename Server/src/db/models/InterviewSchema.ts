import mongoose, { Document, Schema } from "mongoose";

export interface IInterview extends Document {
  recruiterId: mongoose.Types.ObjectId; // Linked recruiter
  interviewType: "HR" | "Technical" | "Mock" | "Live-normal";
  jobRole: string;
  seniority: string;
  skills: string[];
  responsibilities: string[];

  mustAskQuestions: {
    question: string;
    expectedAnswer?: string;
    weight?: number;
  }[];

  difficultyMix: {
    easy: number;
    medium: number;
    hard: number;
    logic: number;
  };

  resume: {
    fileUrl: string; 
    parsedData?: {
      name?: string;
      email?: string;
      skills?: string[];
      experience?: string;
      education?: string;
    };
  };

  meetingMode: "in-app" | "external";
  externalPlatform?: "google-meet" | "zoom" | "teams";
  meetingLink?: string;

  scheduledAt: Date;
  status: "scheduled" | "ongoing" | "completed";

  report?: {
    transcript: string;
    highlights: string[];
    scores: { [questionId: string]: number };
    overallFit: string;
    risks?: string[];
    recommendation?: string;
  };
}

const InterviewSchema: Schema<IInterview> = new Schema(
  {
    recruiterId: { type: Schema.Types.ObjectId, ref: "Recruiter", required: true },
    interviewType: { 
      type: String, 
      enum: ["HR", "Technical", "Mock", "Live-normal"], 
      required: true 
    },
    jobRole: { type: String, required: true },
    seniority: { type: String, required: true },
    skills: [{ type: String }],
    responsibilities: [{ type: String }],

    mustAskQuestions: [
      {
        question: { type: String, required: true },
        expectedAnswer: { type: String },
        weight: { type: Number, default: 1 },
      },
    ],

    difficultyMix: {
      easy: { type: Number, default: 0 },
      medium: { type: Number, default: 0 },
      hard: { type: Number, default: 0 },
      logic: { type: Number, default: 0 },
    },

    resume: {
      fileUrl: { type: String, required: true },
      parsedData: {
        name: { type: String },
        email: { type: String },
        skills: [{ type: String }],
        experience: { type: String },
        education: { type: String },
      },
    },

    meetingMode: { type: String, enum: ["in-app", "external"], default: "in-app" },
    externalPlatform: { type: String, enum: ["google-meet", "zoom", "teams"] },
    meetingLink: { type: String },

    scheduledAt: { type: Date, required: true },
    status: { type: String, enum: ["scheduled", "ongoing", "completed"], default: "scheduled" },

    report: {
      transcript: { type: String },
      highlights: [{ type: String }],
      scores: { type: Map, of: Number },
      overallFit: { type: String },
      risks: [{ type: String }],
      recommendation: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model<IInterview>("Interview", InterviewSchema);
