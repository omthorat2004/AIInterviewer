import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Recruiter, { IRecruiter } from "../db/modal/RecruiterModal";

const JWT_KEY = process.env.JWT_SECRET || "supersecretkey";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, organizationName } = req.body;
    const existingRecruiter = await Recruiter.findOne({ email });
    if (existingRecruiter) {
      res.status(400).json({ message: "Email already registered" });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const newRecruiter: IRecruiter = new Recruiter({
      name,
      email,
      passwordHash,
      organization: { name: organizationName },
    });
    await newRecruiter.save();
    const token = jwt.sign(
      { id: newRecruiter._id, email: newRecruiter.email },
      JWT_KEY,
      { expiresIn: "1d" }
    );
    res.status(201).json({
      message: "Signup successful",
      token,
      recruiter: {
        id: newRecruiter._id,
        name: newRecruiter.name,
        email: newRecruiter.email,
        organization: newRecruiter.organization,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const recruiter = await Recruiter.findOne({ email });
    if (!recruiter) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }
    const isMatch = await bcrypt.compare(password, recruiter.passwordHash);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }
    const token = jwt.sign(
      { id: recruiter._id, email: recruiter.email },
      JWT_KEY,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      message: "Login successful",
      token,
      recruiter: {
        id: recruiter._id,
        name: recruiter.name,
        email: recruiter.email,
        organization: recruiter.organization,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const verifyRecruiter = async (req: Request, res: Response): Promise<Response> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_KEY) as { id: string; email: string };

    if (!decoded || !decoded.id) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const recruiter = await Recruiter.findById(decoded.id).select("-passwordHash");
    if (!recruiter) {
      return res.status(404).json({ error: "Recruiter not found" });
    }

    return res.status(200).json({
      message: "Token is valid",
      recruiter: {
        id: recruiter._id,
        name: recruiter.name,
        email: recruiter.email,
        organization: {
          name: recruiter.organization?.name,
          size: recruiter.organization?.size,
          industry: recruiter.organization?.industry,
          hqLocation: recruiter.organization?.hqLocation,
        },
        preferences: {
          interviewTypes: recruiter.preferences?.interviewTypes,
          integration: recruiter.preferences?.integration,
          timezone: recruiter.preferences?.timezone,
          languages: recruiter.preferences?.languages,
        },
        createdAt: recruiter.createdAt,
        updatedAt: recruiter.updatedAt,
      },
    });
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized or expired token" });
  }
};
