import { Router } from 'express';
import { createOrUpdateOrganization } from '../controller/onboarding.controller'; 
import authMiddleware from '../middlewares/auth.middleware'; 

const onboardingRouter = Router();

onboardingRouter.post('/org', authMiddleware, createOrUpdateOrganization);

export default onboardingRouter;

