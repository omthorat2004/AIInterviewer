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
const Organization_1 = __importDefault(require("../db/models/Organization"));
const createOrUpdateOrganization = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, size, industry, hqLocation, primaryInterviewTypes, integrationPreferences, defaultTimezone, defaultLanguages, } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        let org = yield Organization_1.default.findOne({ userId });
        if (org) {
            org.name = name;
            org.size = size;
            org.industry = industry;
            org.hqLocation = hqLocation;
            org.primaryInterviewTypes = primaryInterviewTypes;
            org.integrationPreferences = integrationPreferences;
            org.defaultTimezone = defaultTimezone;
            org.defaultLanguages = defaultLanguages;
            yield org.save();
        }
        else {
            org = new Organization_1.default({
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
            yield org.save();
        }
        res.status(200).json({ message: 'Organization info saved', organization: org });
    }
    catch (error) {
        console.error('Onboarding error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});
exports.createOrUpdateOrganization = createOrUpdateOrganization;
