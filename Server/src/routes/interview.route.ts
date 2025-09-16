import { Router } from "express";
import { createInterview } from "../controller/interview.controller";

const router = Router()

router.post('/addInterview',createInterview)

export default router