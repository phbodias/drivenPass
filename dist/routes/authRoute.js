"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var validateSchemaMiddleware_1 = require("../middlewares/validateSchemaMiddleware");
var authController_1 = require("../controllers/authController");
var authSchema_1 = __importDefault(require("../schemas/authSchema"));
var authRoute = (0, express_1.Router)();
authRoute.post('/signup', (0, validateSchemaMiddleware_1.validateSchemaMiddleware)(authSchema_1["default"]), authController_1.signUpController);
authRoute.post('/signin', (0, validateSchemaMiddleware_1.validateSchemaMiddleware)(authSchema_1["default"]), authController_1.signInController);
exports["default"] = authRoute;
