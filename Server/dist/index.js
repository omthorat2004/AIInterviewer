"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dbConnect_1 = __importDefault(require("./db/dbConnect"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const onboarding_route_1 = __importDefault(require("./routes/onboarding.route"));
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/recruiter', auth_route_1.default);
app.use('/api', onboarding_route_1.default);
(0, dbConnect_1.default)();
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
