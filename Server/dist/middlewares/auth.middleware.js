"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const JWT_KEY = process.env.JWT_SECRET || 'supersecretkey';
if (!JWT_KEY)
    throw new Error('JWT_SECRET is not defined');
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ message: 'Authorization header missing or invalid' });
            return;
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'No token provided' });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_KEY);
        if (!decoded || !decoded.id) {
            res.status(401).json({ message: 'Invalid token' });
            return;
        }
        req.user = { id: decoded.id, email: decoded.email };
        next();
    }
    catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({ message: 'Unauthorized or token expired' });
    }
};
exports.default = authMiddleware;
