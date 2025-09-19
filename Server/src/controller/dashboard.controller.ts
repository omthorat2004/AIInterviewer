import { Request, Response } from "express";
import mongoose from "mongoose";
import Interview from "../db/models/InterviewSchema";


export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orgId } = req.params;
    if (!orgId || !mongoose.Types.ObjectId.isValid(orgId)) {
      res.status(400).json({ message: "Invalid or missing organisation ID" });
      return;
    }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);


    const totalInterviews = await Interview.countDocuments({ recruiterId: orgId });


    const monthlyInterviews = await Interview.countDocuments({
      recruiterId: orgId,
      createdAt: { $gte: startOfMonth },
    });


    const recentActivities = await Interview.find({ recruiterId: orgId })
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
  } catch (error) {
    console.error("Dashboard Stats error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


export const getOrganisationInterviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orgId } = req.params;
    if (!orgId || !mongoose.Types.ObjectId.isValid(orgId)) {
      res.status(400).json({ message: "Invalid or missing organisation ID" });
      return;
    }

    const interviews = await Interview.find({ recruiterId: orgId })
      .sort({ scheduledAt: -1 })
      .select(
        "jobRole interviewType seniority skills scheduledAt status meetingMode externalPlatform meetingLink createdAt"
      );

    res.status(200).json({
      message: "Organisation interviews fetched successfully",
      total: interviews.length,
      interviews,
    });
  } catch (error) {
    console.error("Organisation Interviews error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
