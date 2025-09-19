import { Router } from 'express';
import { getDashboardStats, getOrganisationInterviews } from '../controller/dashboard.controller';

const router = Router()

router.get("/:orgId/stats", getDashboardStats);


router.get("/:orgId/interviews", getOrganisationInterviews);

export default router;