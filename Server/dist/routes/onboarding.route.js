"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const onboarding_controller_1 = require("../controller/onboarding.controller");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const onboardingRouter = (0, express_1.Router)();
onboardingRouter.post('/org', auth_middleware_1.default, onboarding_controller_1.createOrUpdateOrganization);
exports.default = onboardingRouter;
