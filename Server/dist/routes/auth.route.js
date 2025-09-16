"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth.controller");
const authRouter = (0, express_1.Router)();
authRouter.post('/login', auth_controller_1.login);
authRouter.post('/signup', auth_controller_1.signup);
authRouter.get('/verify', auth_controller_1.verifyRecruiter);
exports.default = authRouter;
