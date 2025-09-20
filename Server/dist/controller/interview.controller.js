"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeetingLink = exports.createInterview = exports.getInterviewResult = void 0;
const InterviewSchema_1 = __importDefault(require("../db/models/InterviewSchema"));
const getInterviewResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const interview = yield InterviewSchema_1.default.findById(id)
            .select("jobRole interviewType seniority skills scheduledAt status meetingMode externalPlatform meetingLink report createdAt updatedAt")
            .lean();
        if (!interview) {
            res.status(404).json({ message: "Interview not found" });
            return;
        }
        res.status(200).json({
            message: "Interview result fetched successfully",
            interview,
        });
    }
    catch (error) {
        console.error("Get Interview Result error:", error);
        res.status(500).json({ message: "Server error", error });
    }
});
exports.getInterviewResult = getInterviewResult;
const createInterview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const recruiterId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!recruiterId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const { interviewType, jobRole, seniority, skills, responsibilities, mustAskQuestions, difficultyMix, resume, meetingMode, externalPlatform, scheduledAt, } = req.body;
        const interview = new InterviewSchema_1.default({
            recruiterId,
            interviewType,
            jobRole,
            seniority,
            skills,
            responsibilities,
            mustAskQuestions,
            difficultyMix,
            resume,
            meetingMode,
            externalPlatform,
            scheduledAt,
        });
        yield interview.save();
        res.status(201).json({ message: "Interview created successfully", interview });
    }
    catch (error) {
        console.error("Create Interview error:", error);
        res.status(500).json({ message: "Server error", error });
    }
});
exports.createInterview = createInterview;
const getMeetingLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const interview = yield InterviewSchema_1.default.findById(id).select("meetingLink meetingMode externalPlatform scheduledAt status");
        if (!interview) {
            res.status(404).json({ message: "Interview not found" });
            return;
        }
        if (!interview.meetingLink) {
            res.status(400).json({ message: "Meeting link not generated yet" });
            return;
        }
        res.status(200).json({
            message: "Meeting link fetched successfully",
            meeting: {
                link: interview.meetingLink,
                mode: interview.meetingMode,
                platform: interview.externalPlatform,
                scheduledAt: interview.scheduledAt,
                status: interview.status,
            }
        });
    }
    catch (error) {
        console.error("Get Meeting Link error:", error);
        res.status(500).json({ message: "Server error", error });
    }
});
exports.getMeetingLink = getMeetingLink;
