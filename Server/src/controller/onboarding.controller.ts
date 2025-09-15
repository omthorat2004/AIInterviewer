import { Request, Response } from 'express';
import Organization from '../db/models/Organization';

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

    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    let org = await Organization.findOne({ userId });

    if (org) {
      org.name = name;
      org.size = size;
      org.industry = industry;
      org.hqLocation = hqLocation;
      org.primaryInterviewTypes = primaryInterviewTypes;
      org.integrationPreferences = integrationPreferences;
      org.defaultTimezone = defaultTimezone;
      org.defaultLanguages = defaultLanguages;
      await org.save();
    } else {
      org = new Organization({
        userId,
        name,
        size,
        industry,
        hqLocation,
        primaryInterviewTypes,
        integrationPreferences,
        defaultTimezone,
        defaultLanguages,
      });
      await org.save();
    }

    res.status(200).json({ message: 'Organization info saved', organization: org });
  } catch (error) {
    console.error('Onboarding error:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
