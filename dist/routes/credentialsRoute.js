"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var credentialControllers_1 = require("../controllers/credentialControllers");
var tokenMiddleware_1 = require("../middlewares/tokenMiddleware");
var validateSchemaMiddleware_1 = require("../middlewares/validateSchemaMiddleware");
var credentialSchema_1 = __importDefault(require("../schemas/credentialSchema"));
var credentialRoute = (0, express_1.Router)();
credentialRoute.post("/credential", tokenMiddleware_1.validateJWT, (0, validateSchemaMiddleware_1.validateSchemaMiddleware)(credentialSchema_1["default"]), credentialControllers_1.createCredential);
credentialRoute.get("/credentials", tokenMiddleware_1.validateJWT, credentialControllers_1.getUserCredentials);
credentialRoute.get("/credential/:id", tokenMiddleware_1.validateJWT, credentialControllers_1.getCredentialBYId);
credentialRoute["delete"]("/credential/:id", tokenMiddleware_1.validateJWT, credentialControllers_1.deleteCredential);
exports["default"] = credentialRoute;
