import { Router } from "express";

import { createInterview, getInterviewResult, getMeetingLink } from "../controller/interview.controller";



const router = Router()

router.post('/addInterview',createInterview)


router.get('/:id/meeting-link',getMeetingLink)

router.get("/:id/result", getInterviewResult);


export default router