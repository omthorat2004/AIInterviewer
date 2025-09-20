"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrUpdateOrganization = void 0;
const RecruiterModal_1 = __importDefault(require("../db/models/RecruiterModal"));
const createOrUpdateOrganization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
        const { name, size, industry, hqLocation, primaryInterviewTypes, integrationPreferences, defaultTimezone, defaultLanguages, } = req.body;
        const recruiterId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!recruiterId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        // Find recruiter
        const recruiter = yield RecruiterModal_1.default.findById(recruiterId);
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
            interviewTypes: primaryInterviewTypes || ((_b = recruiter.preferences) === null || _b === void 0 ? void 0 : _b.interviewTypes) || [],
            integration: integrationPreferences || ((_c = recruiter.preferences) === null || _c === void 0 ? void 0 : _c.integration) || "google",
            timezone: defaultTimezone || ((_d = recruiter.preferences) === null || _d === void 0 ? void 0 : _d.timezone),
            languages: defaultLanguages || ((_e = recruiter.preferences) === null || _e === void 0 ? void 0 : _e.languages) || [],
        };
        yield recruiter.save();
        res.status(200).json({ message: "Organization info saved", recruiter });
    }
    catch (error) {
        console.error("Onboarding error:", error);
        res.status(500).json({ message: "Server error", error });
    }
});
exports.createOrUpdateOrganization = createOrUpdateOrganization;
