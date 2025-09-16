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
exports.verifyRecruiter = exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const RecruiterModal_1 = __importDefault(require("../db/models/RecruiterModal"));
const JWT_KEY = process.env.JWT_SECRET || "supersecretkey";
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, organizationName } = req.body;
        const existingRecruiter = yield RecruiterModal_1.default.findOne({ email });
        if (existingRecruiter) {
            res.status(400).json({ message: "Email already registered" });
            return;
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const passwordHash = yield bcrypt_1.default.hash(password, salt);
        const newRecruiter = new RecruiterModal_1.default({
            name,
            email,
            passwordHash,
            organization: { name: organizationName },
        });
        yield newRecruiter.save();
        const token = jsonwebtoken_1.default.sign({ id: newRecruiter._id, email: newRecruiter.email }, JWT_KEY, { expiresIn: "1d" });
        res.status(201).json({
            message: "Signup successful",
            token,
            recruiter: {
                id: newRecruiter._id,
                name: newRecruiter.name,
                email: newRecruiter.email,
                organization: newRecruiter.organization,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const recruiter = yield RecruiterModal_1.default.findOne({ email });
        if (!recruiter) {
            res.status(400).json({ message: "Invalid email or password" });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(password, recruiter.passwordHash);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid email or password" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: recruiter._id, email: recruiter.email }, JWT_KEY, { expiresIn: "1d" });
        res.status(200).json({
            message: "Login successful",
            token,
            recruiter: {
                id: recruiter._id,
                name: recruiter.name,
                email: recruiter.email,
                organization: recruiter.organization,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.login = login;
const verifyRecruiter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_KEY);
        if (!decoded || !decoded.id) {
            return res.status(401).json({ error: "Invalid token" });
        }
        const recruiter = yield RecruiterModal_1.default.findById(decoded.id).select("-passwordHash");
        if (!recruiter) {
            return res.status(404).json({ error: "Recruiter not found" });
        }
        return res.status(200).json({
            message: "Token is valid",
            recruiter: {
                id: recruiter._id,
                name: recruiter.name,
                email: recruiter.email,
                organization: {
                    name: (_b = recruiter.organization) === null || _b === void 0 ? void 0 : _b.name,
                    size: (_c = recruiter.organization) === null || _c === void 0 ? void 0 : _c.size,
                    industry: (_d = recruiter.organization) === null || _d === void 0 ? void 0 : _d.industry,
                    hqLocation: (_e = recruiter.organization) === null || _e === void 0 ? void 0 : _e.hqLocation,
                },
                preferences: {
                    interviewTypes: (_f = recruiter.preferences) === null || _f === void 0 ? void 0 : _f.interviewTypes,
                    integration: (_g = recruiter.preferences) === null || _g === void 0 ? void 0 : _g.integration,
                    timezone: (_h = recruiter.preferences) === null || _h === void 0 ? void 0 : _h.timezone,
                    languages: (_j = recruiter.preferences) === null || _j === void 0 ? void 0 : _j.languages,
                },
                createdAt: recruiter.createdAt,
                updatedAt: recruiter.updatedAt,
            },
        });
    }
    catch (err) {
        return res.status(401).json({ error: "Unauthorized or expired token" });
    }
});
exports.verifyRecruiter = verifyRecruiter;
