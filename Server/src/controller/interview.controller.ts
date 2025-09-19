import { Request, Response } from "express";
import Interview from "../db/models/InterviewSchema";

export const getInterviewResult = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const interview = await Interview.findById(id)
      .select(
        "jobRole interviewType seniority skills scheduledAt status meetingMode externalPlatform meetingLink report createdAt updatedAt"
      )
      .lean();

    if (!interview) {
      res.status(404).json({ message: "Interview not found" });
      return;
    }

    res.status(200).json({
      message: "Interview result fetched successfully",
      interview,
    });
  } catch (error) {
    console.error("Get Interview Result error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};


export const createInterview = async (req: Request, res: Response): Promise<void> => {
  try {
    const recruiterId = (req as any).user?.id; 
    if (!recruiterId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const {
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
    } = req.body;

    const interview = new Interview({
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

    await interview.save();

    res.status(201).json({ message: "Interview created successfully", interview });
  } catch (error) {
    console.error("Create Interview error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getMeetingLink = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const interview = await Interview.findById(id).select("meetingLink meetingMode externalPlatform scheduledAt status");
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
  } catch (error) {
    console.error("Get Meeting Link error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};