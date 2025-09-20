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
exports.getOrganisationInterviews = exports.getDashboardStats = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const InterviewSchema_1 = __importDefault(require("../db/models/InterviewSchema"));
const getDashboardStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orgId } = req.params;
        if (!orgId || !mongoose_1.default.Types.ObjectId.isValid(orgId)) {
            res.status(400).json({ message: "Invalid or missing organisation ID" });
            return;
        }
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const totalInterviews = yield InterviewSchema_1.default.countDocuments({ recruiterId: orgId });
        const monthlyInterviews = yield InterviewSchema_1.default.countDocuments({
            recruiterId: orgId,
            createdAt: { $gte: startOfMonth },
        });
        const recentActivities = yield InterviewSchema_1.default.find({ recruiterId: orgId })
            .sort({ createdAt: -1 })
            .limit(5)
            .select("jobRole interviewType scheduledAt status createdAt");
        res.status(200).json({
            message: "Dashboard stats fetched successfully",
            stats: {
                totalInterviews,
                monthlyInterviews,
                recentActivities,
            },
        });
    }
    catch (error) {
        console.error("Dashboard Stats error:", error);
        res.status(500).json({ message: "Server error", error });
    }
});
exports.getDashboardStats = getDashboardStats;
const getOrganisationInterviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orgId } = req.params;
        if (!orgId || !mongoose_1.default.Types.ObjectId.isValid(orgId)) {
            res.status(400).json({ message: "Invalid or missing organisation ID" });
            return;
        }
        const interviews = yield InterviewSchema_1.default.find({ recruiterId: orgId })
            .sort({ scheduledAt: -1 })
            .select("jobRole interviewType seniority skills scheduledAt status meetingMode externalPlatform meetingLink createdAt");
        res.status(200).json({
            message: "Organisation interviews fetched successfully",
            total: interviews.length,
            interviews,
        });
    }
    catch (error) {
        console.error("Organisation Interviews error:", error);
        res.status(500).json({ message: "Server error", error });
    }
});
exports.getOrganisationInterviews = getOrganisationInterviews;
