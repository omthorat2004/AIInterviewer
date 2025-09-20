"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const InterviewSchema = new mongoose_1.Schema({
    recruiterId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Recruiter", required: true },
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
}, { timestamps: true });
exports.default = mongoose_1.default.model("Interview", InterviewSchema);
