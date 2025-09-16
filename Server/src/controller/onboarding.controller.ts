import { Request, Response } from "express";
import Recruiter from "../db/models/RecruiterModal";

export const createOrUpdateOrganization = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      size,
      industry,
      hqLocation,
      primaryInterviewTypes,
      integrationPreferences,
      defaultTimezone,
      defaultLanguages,
    } = req.body;

    const recruiterId = (req as any).user?.id;

    if (!recruiterId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Find recruiter
    const recruiter = await Recruiter.findById(recruiterId);
    if (!recruiter) {
      res.status(404).json({ message: "Recruiter not found" });
      return;
    }

    // Update recruiter.organization + recruiter.preferences
    recruiter.organization = {
      name,
      size,
      industry,
      hqLocation,
    };

    recruiter.preferences = {
      interviewTypes: primaryInterviewTypes || recruiter.preferences?.interviewTypes || [],
      integration: integrationPreferences || recruiter.preferences?.integration || "google",
      timezone: defaultTimezone || recruiter.preferences?.timezone,
      languages: defaultLanguages || recruiter.preferences?.languages || [],
    };

    await recruiter.save();

    res.status(200).json({ message: "Organization info saved", recruiter });
  } catch (error) {
    console.error("Onboarding error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
