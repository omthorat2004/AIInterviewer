"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = require("../controller/dashboard.controller");
const router = (0, express_1.Router)();
router.get("/:orgId/stats", dashboard_controller_1.getDashboardStats);
router.get("/:orgId/interviews", dashboard_controller_1.getOrganisationInterviews);
exports.default = router;
