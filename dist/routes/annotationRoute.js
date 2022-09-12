"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var annotationController_1 = require("../controllers/annotationController");
var tokenMiddleware_1 = require("../middlewares/tokenMiddleware");
var validateSchemaMiddleware_1 = require("../middlewares/validateSchemaMiddleware");
var annotationsSchema_1 = __importDefault(require("../schemas/annotationsSchema"));
var annotationRoute = (0, express_1.Router)();
annotationRoute.post("/annotation", tokenMiddleware_1.validateJWT, (0, validateSchemaMiddleware_1.validateSchemaMiddleware)(annotationsSchema_1["default"]), annotationController_1.createAnnotation);
annotationRoute.get("/annotations", tokenMiddleware_1.validateJWT, annotationController_1.getUserAnnotations);
annotationRoute.get("/annotation/:id", tokenMiddleware_1.validateJWT, annotationController_1.getAnnotationBYId);
annotationRoute["delete"]("/annotation/:id", tokenMiddleware_1.validateJWT, annotationController_1.deleteAnnotation);
exports["default"] = annotationRoute;
