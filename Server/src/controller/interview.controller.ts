import { Request, Response } from "express";
import Interview from "../db/models/InterviewSchema";


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
