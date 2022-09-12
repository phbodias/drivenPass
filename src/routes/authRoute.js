"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateSchemaMiddleware_1 = require("../middlewares/validateSchemaMiddleware");
const authController_1 = require("../controllers/authController");
const authSchema_1 = __importDefault(require("../schemas/authSchema"));
const authRoute = (0, express_1.Router)();
authRoute.post('/signup', (0, validateSchemaMiddleware_1.validateSchemaMiddleware)(authSchema_1.default), authController_1.signUpController);
authRoute.post('/signin', (0, validateSchemaMiddleware_1.validateSchemaMiddleware)(authSchema_1.default), authController_1.signInController);
exports.default = authRoute;
