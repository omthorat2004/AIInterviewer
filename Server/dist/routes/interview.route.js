"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const interview_controller_1 = require("../controller/interview.controller");
const router = (0, express_1.Router)();
router.post('/addInterview', interview_controller_1.createInterview);
router.get('/:id/meeting-link', interview_controller_1.getMeetingLink);
router.get("/:id/result", interview_controller_1.getInterviewResult);
exports.default = router;
