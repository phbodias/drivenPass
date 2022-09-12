"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const credentialControllers_1 = require("../controllers/credentialControllers");
const tokenMiddleware_1 = require("../middlewares/tokenMiddleware");
const validateSchemaMiddleware_1 = require("../middlewares/validateSchemaMiddleware");
const credentialSchema_1 = __importDefault(require("../schemas/credentialSchema"));
const credentialRoute = (0, express_1.Router)();
credentialRoute.post("/credential", tokenMiddleware_1.validateJWT, (0, validateSchemaMiddleware_1.validateSchemaMiddleware)(credentialSchema_1.default), credentialControllers_1.createCredential);
credentialRoute.get("/credentials", tokenMiddleware_1.validateJWT, credentialControllers_1.getUserCredentials);
credentialRoute.get("/credential/:id", tokenMiddleware_1.validateJWT, credentialControllers_1.getCredentialBYId);
credentialRoute.delete("/credential/:id", tokenMiddleware_1.validateJWT, credentialControllers_1.deleteCredential);
exports.default = credentialRoute;
